export const FPS_SHARE_VERSION = '1';

export type FPSCalculatorConfig = {
  cpu: string;
  gpu: string;
  game: string;
  resolution: string;
  ramSize: string;
  ramSpeed: string;
  storage: string;
  quality: string;
  upscaling: string;
  refreshRate: string;
  antiAliasing: string;
};

export type FPSCalculatorBuild = FPSCalculatorConfig & {
  fps: number;
};

export const FPS_SHARE_DEFAULTS = {
  ramSize: '16gb',
  ramSpeed: '3200',
  storage: 'nvme-ssd',
  quality: 'high',
  upscaling: 'off',
  refreshRate: '144hz',
  antiAliasing: 'fxaa',
} as const;

const resolutionIds = new Set(['1080p', '1440p', '4K']);
const ramSizeIds = new Set(['8gb', '16gb', '32gb', '64gb', '128gb']);
const ramSpeedIds = new Set(['2666', '3200', '3600', '4000', '4400', '4800', '5200', '6000']);
const storageIds = new Set(['hdd', 'sata-ssd', 'nvme-ssd']);
const qualityIds = new Set(['low', 'medium', 'high', 'ultra', 'ray-tracing', 'rt-ultra', 'rt-extreme']);
const upscalingIds = new Set([
  'off',
  'nvidia-dlss',
  'amd-fsr',
  'intel-xess',
  'dlss-quality',
  'dlss-balanced',
  'dlss-performance',
  'fsr2',
  'fsr-quality',
  'xe-ss',
  'xess-quality',
]);
const refreshRateIds = new Set(['60hz', '120hz', '144hz', '240hz', '360hz']);
const antiAliasingIds = new Set(['off', 'fxaa', 'smaa', 'taa', 'msaa-2x', 'msaa-4x', 'msaa-8x', 'dlss-aa']);

const FPS_SHARE_QUERY_KEYS = [
  'fps',
  'v',
  'cpu',
  'gpu',
  'game',
  'resolution',
  'ram',
  'ramSpeed',
  'storage',
  'quality',
  'upscaling',
  'refresh',
  'aa',
] as const;

function getValidValue(
  params: URLSearchParams,
  key: string,
  validValues: Set<string>,
  fallback: string
) {
  const value = params.get(key);
  return value && validValues.has(value) ? value : fallback;
}

export function parseFPSShareParams(search: string | URLSearchParams): FPSCalculatorConfig | null {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;

  if (params.get('fps') !== '1' || params.get('v') !== FPS_SHARE_VERSION) {
    return null;
  }

  const cpu = params.get('cpu') ?? '';
  const gpu = params.get('gpu') ?? '';
  const game = params.get('game') ?? '';
  const resolution = params.get('resolution') ?? '';

  if (!cpu || !gpu || !game || !resolutionIds.has(resolution)) {
    return null;
  }

  return {
    cpu,
    gpu,
    game,
    resolution,
    ramSize: getValidValue(params, 'ram', ramSizeIds, FPS_SHARE_DEFAULTS.ramSize),
    ramSpeed: getValidValue(params, 'ramSpeed', ramSpeedIds, FPS_SHARE_DEFAULTS.ramSpeed),
    storage: getValidValue(params, 'storage', storageIds, FPS_SHARE_DEFAULTS.storage),
    quality: getValidValue(params, 'quality', qualityIds, FPS_SHARE_DEFAULTS.quality),
    upscaling: getValidValue(params, 'upscaling', upscalingIds, FPS_SHARE_DEFAULTS.upscaling),
    refreshRate: getValidValue(params, 'refresh', refreshRateIds, FPS_SHARE_DEFAULTS.refreshRate),
    antiAliasing: getValidValue(params, 'aa', antiAliasingIds, FPS_SHARE_DEFAULTS.antiAliasing),
  };
}

export function serializeFPSShareConfig(config: FPSCalculatorConfig) {
  return new URLSearchParams({
    fps: '1',
    v: FPS_SHARE_VERSION,
    cpu: config.cpu,
    gpu: config.gpu,
    game: config.game,
    resolution: config.resolution,
    ram: config.ramSize,
    ramSpeed: config.ramSpeed,
    storage: config.storage,
    quality: config.quality,
    upscaling: config.upscaling,
    refresh: config.refreshRate,
    aa: config.antiAliasing,
  });
}

export function removeFPSShareParams(search: string | URLSearchParams) {
  const params = typeof search === 'string' ? new URLSearchParams(search) : new URLSearchParams(search);
  FPS_SHARE_QUERY_KEYS.forEach((key) => params.delete(key));
  return params;
}
