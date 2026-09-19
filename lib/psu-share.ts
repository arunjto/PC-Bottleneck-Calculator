import { allCPUs, allGPUs } from '@/lib/hardware-database';
import {
  DEFAULT_PSU_PERIPHERALS,
  type PsuCoolingType,
  type PsuPeripheralSelection,
} from '@/lib/psu-model';

export const PSU_SHARE_VERSION = '1';

export type PsuShareConfig = {
  cpu: string;
  gpu: string;
  secondGpu: string;
  peripherals: PsuPeripheralSelection;
  efficiency: string;
};

const coolingTypes = new Set<PsuCoolingType>(['air', 'aio', 'customLoop']);
const efficiencyTypes = new Set(['80plus', '80plus-bronze', '80plus-silver', '80plus-gold', '80plus-platinum', '80plus-titanium']);

function getInt(params: URLSearchParams, key: string, fallback: number, max: number) {
  const parsed = Number.parseInt(params.get(key) ?? '', 10);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(0, parsed)) : fallback;
}

export function parsePsuShareParams(search: string | URLSearchParams): PsuShareConfig | null {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;
  if (params.get('psu') !== '1' || params.get('v') !== PSU_SHARE_VERSION) return null;

  const cpu = params.get('cpu') ?? '';
  const gpu = params.get('gpu') ?? '';
  const secondGpu = params.get('gpu2') ?? '';
  if (!allCPUs.some((item) => item.id === cpu) || !allGPUs.some((item) => item.id === gpu)) return null;

  const peripherals: PsuPeripheralSelection = {
    ramSticks: getInt(params, 'ram', DEFAULT_PSU_PERIPHERALS.ramSticks, 8),
    nvmeDrives: getInt(params, 'nvme', DEFAULT_PSU_PERIPHERALS.nvmeDrives, 8),
    sataSsds: getInt(params, 'sata', DEFAULT_PSU_PERIPHERALS.sataSsds, 8),
    hardDrives: getInt(params, 'hdd', DEFAULT_PSU_PERIPHERALS.hardDrives, 8),
    caseFans: getInt(params, 'fans', DEFAULT_PSU_PERIPHERALS.caseFans, 20),
    cooling: coolingTypes.has(params.get('cooling') as PsuCoolingType)
      ? params.get('cooling') as PsuCoolingType
      : DEFAULT_PSU_PERIPHERALS.cooling,
    rgbControllers: getInt(params, 'rgb', DEFAULT_PSU_PERIPHERALS.rgbControllers, 10),
    addInCards: getInt(params, 'cards', DEFAULT_PSU_PERIPHERALS.addInCards, 8),
    usbDevices: getInt(params, 'usb', DEFAULT_PSU_PERIPHERALS.usbDevices, 12),
    overclocking: params.get('oc') === '1',
    manualExtraWatts: getInt(params, 'extra', DEFAULT_PSU_PERIPHERALS.manualExtraWatts, 1000),
  };

  return {
    cpu,
    gpu,
    secondGpu: secondGpu && secondGpu !== gpu && allGPUs.some((item) => item.id === secondGpu) ? secondGpu : '',
    peripherals,
    efficiency: efficiencyTypes.has(params.get('eff') ?? '') ? params.get('eff') ?? '' : '',
  };
}

export function serializePsuShareConfig(config: PsuShareConfig) {
  const params = new URLSearchParams({
    psu: '1',
    v: PSU_SHARE_VERSION,
    cpu: config.cpu,
    gpu: config.gpu,
    ram: String(config.peripherals.ramSticks),
    nvme: String(config.peripherals.nvmeDrives),
    sata: String(config.peripherals.sataSsds),
    hdd: String(config.peripherals.hardDrives),
    fans: String(config.peripherals.caseFans),
    cooling: config.peripherals.cooling,
    rgb: String(config.peripherals.rgbControllers),
    cards: String(config.peripherals.addInCards),
    usb: String(config.peripherals.usbDevices),
    oc: config.peripherals.overclocking ? '1' : '0',
    extra: String(config.peripherals.manualExtraWatts),
    eff: config.efficiency,
  });
  if (config.secondGpu) params.set('gpu2', config.secondGpu);
  return params;
}
