import {
  parseFPSShareParams,
  serializeFPSShareConfig,
  type FPSCalculatorBuild,
  type FPSCalculatorConfig,
} from '@/lib/fps-share';

export const FPS_HISTORY_STORAGE_KEY = 'pcbuildcheck:fps-history:v1';
export const FPS_HISTORY_VERSION = 1;
export const FPS_HISTORY_LIMIT = 10;
export const FPS_HISTORY_NAME_LIMIT = 60;

export type FPSHistoryEntry = {
  id: string;
  name: string | null;
  config: FPSCalculatorConfig;
  createdAt: string;
  updatedAt: string;
};

type StoredFPSHistory = {
  version: number;
  entries: FPSHistoryEntry[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeConfig(value: unknown): FPSCalculatorConfig | null {
  if (!isRecord(value)) return null;

  const candidate = {
    cpu: value.cpu,
    gpu: value.gpu,
    game: value.game,
    resolution: value.resolution,
    ramSize: value.ramSize,
    ramSpeed: value.ramSpeed,
    storage: value.storage,
    quality: value.quality,
    upscaling: value.upscaling,
    refreshRate: value.refreshRate,
    antiAliasing: value.antiAliasing,
  };

  if (Object.values(candidate).some((item) => typeof item !== 'string')) return null;

  const config = candidate as FPSCalculatorConfig;
  const normalized = parseFPSShareParams(serializeFPSShareConfig(config));
  if (!normalized) return null;

  const isExactMatch = Object.entries(normalized).every(
    ([key, normalizedValue]) => config[key as keyof FPSCalculatorConfig] === normalizedValue
  );
  return isExactMatch ? normalized : null;
}

function normalizeEntry(value: unknown): FPSHistoryEntry | null {
  if (!isRecord(value)) return null;

  const config = normalizeConfig(value.config);
  const id = typeof value.id === 'string' ? value.id.trim() : '';
  const createdAt = typeof value.createdAt === 'string' ? value.createdAt : '';
  const updatedAt = typeof value.updatedAt === 'string' ? value.updatedAt : '';
  const name = typeof value.name === 'string' ? value.name.trim().slice(0, FPS_HISTORY_NAME_LIMIT) : null;

  if (
    !config
    || !id
    || id.length > 100
    || !Number.isFinite(Date.parse(createdAt))
    || !Number.isFinite(Date.parse(updatedAt))
  ) {
    return null;
  }

  return { id, name: name || null, config, createdAt, updatedAt };
}

export function parseFPSHistory(raw: string | null): FPSHistoryEntry[] {
  if (!raw) return [];

  try {
    const stored = JSON.parse(raw) as unknown;
    if (!isRecord(stored) || stored.version !== FPS_HISTORY_VERSION || !Array.isArray(stored.entries)) {
      return [];
    }

    return stored.entries
      .map(normalizeEntry)
      .filter((entry): entry is FPSHistoryEntry => entry !== null)
      .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt))
      .slice(0, FPS_HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export function serializeFPSHistory(entries: FPSHistoryEntry[]) {
  const stored: StoredFPSHistory = {
    version: FPS_HISTORY_VERSION,
    entries: entries.slice(0, FPS_HISTORY_LIMIT),
  };
  return JSON.stringify(stored);
}

export function configFromFPSBuild(build: FPSCalculatorBuild): FPSCalculatorConfig {
  return {
    cpu: build.cpu,
    gpu: build.gpu,
    game: build.game,
    resolution: build.resolution,
    ramSize: build.ramSize,
    ramSpeed: build.ramSpeed,
    storage: build.storage,
    quality: build.quality,
    upscaling: build.upscaling,
    refreshRate: build.refreshRate,
    antiAliasing: build.antiAliasing,
  };
}

export function getFPSConfigFingerprint(config: FPSCalculatorConfig) {
  return serializeFPSShareConfig(config).toString();
}

export function upsertFPSHistory(
  entries: FPSHistoryEntry[],
  config: FPSCalculatorConfig,
  updatedAt = new Date().toISOString(),
  createId = () => globalThis.crypto?.randomUUID?.()
    ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
) {
  const fingerprint = getFPSConfigFingerprint(config);
  const existing = entries.find(
    (entry) => getFPSConfigFingerprint(entry.config) === fingerprint
  );
  const nextEntry: FPSHistoryEntry = existing
    ? { ...existing, config, updatedAt }
    : { id: createId(), name: null, config, createdAt: updatedAt, updatedAt };

  return [
    nextEntry,
    ...entries.filter((entry) => entry.id !== nextEntry.id),
  ].slice(0, FPS_HISTORY_LIMIT);
}

export function renameFPSHistoryEntry(entries: FPSHistoryEntry[], id: string, name: string) {
  const normalizedName = name.trim().slice(0, FPS_HISTORY_NAME_LIMIT);
  return entries.map((entry) => entry.id === id
    ? { ...entry, name: normalizedName || null }
    : entry);
}

export function removeFPSHistoryEntry(entries: FPSHistoryEntry[], id: string) {
  return entries.filter((entry) => entry.id !== id);
}
