export type FPSResultImageTheme = 'light' | 'dark';
export type FPSResultImageLayout = 'square' | 'wide';

export type FPSResultImageData = {
  brand: string;
  title: string;
  game: string;
  cpu: string;
  gpu: string;
  resolution: string;
  quality: string;
  upscaling: string;
  fpsRange: string;
  onePercentLow: string;
  limitingComponent: string;
  modelVersion: string;
  shareUrl: string;
  disclaimer: string;
  labels: {
    cpu: string;
    gpu: string;
    settings: string;
    fpsRange: string;
    onePercentLow: string;
    limitingComponent: string;
    modelVersion: string;
    shareUrl: string;
  };
};

export const FPS_RESULT_IMAGE_DIMENSIONS: Record<FPSResultImageLayout, { width: number; height: number }> = {
  square: { width: 1080, height: 1080 },
  wide: { width: 1200, height: 630 },
};

type Palette = {
  background: string;
  backgroundAccent: string;
  panel: string;
  panelStrong: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentSoft: string;
  success: string;
};

const palettes: Record<FPSResultImageTheme, Palette> = {
  dark: {
    background: '#070b14',
    backgroundAccent: '#111c31',
    panel: '#111827',
    panelStrong: '#172033',
    border: '#334155',
    text: '#f8fafc',
    muted: '#a8b3c5',
    accent: '#22d3ee',
    accentSoft: '#164e63',
    success: '#4ade80',
  },
  light: {
    background: '#f8fafc',
    backgroundAccent: '#e0f2fe',
    panel: '#ffffff',
    panelStrong: '#eef6ff',
    border: '#cbd5e1',
    text: '#0f172a',
    muted: '#526175',
    accent: '#0369a1',
    accentSoft: '#dbeafe',
    success: '#15803d',
  },
};

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function drawPanel(
  context: CanvasRenderingContext2D,
  palette: Palette,
  x: number,
  y: number,
  width: number,
  height: number,
  strong = false
) {
  roundedRect(context, x, y, width, height, 24);
  context.fillStyle = strong ? palette.panelStrong : palette.panel;
  context.fill();
  context.strokeStyle = palette.border;
  context.lineWidth = 2;
  context.stroke();
}

function fitText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  forceEllipsis = false
) {
  if (!forceEllipsis && context.measureText(text).width <= maxWidth) return text;
  let shortened = text;
  while (shortened.length > 1 && context.measureText(`${shortened}…`).width > maxWidth) {
    shortened = shortened.slice(0, -1);
  }
  return `${shortened}…`;
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number
) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  const pushLongWord = (word: string) => {
    let segment = '';
    for (const character of word) {
      const candidate = `${segment}${character}`;
      if (segment && context.measureText(candidate).width > maxWidth) {
        lines.push(segment);
        segment = character;
        if (lines.length === maxLines) return '';
      } else {
        segment = candidate;
      }
    }
    return segment;
  };

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (context.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) lines.push(currentLine);
    if (lines.length === maxLines) {
      currentLine = '';
      break;
    }

    currentLine = context.measureText(word).width > maxWidth ? pushLongWord(word) : word;
    if (lines.length === maxLines) {
      currentLine = '';
      break;
    }
  }

  if (currentLine && lines.length < maxLines) lines.push(currentLine);
  const consumedText = lines.join(' ');
  if (consumedText.length < text.length && lines.length > 0) {
    lines[lines.length - 1] = fitText(context, lines[lines.length - 1], maxWidth, true);
  }
  return lines;
}

function drawLabelValue(
  context: CanvasRenderingContext2D,
  palette: Palette,
  label: string,
  value: string,
  x: number,
  y: number,
  maxWidth: number,
  valueSize = 25
) {
  context.fillStyle = palette.muted;
  context.font = '600 16px Inter, Arial, sans-serif';
  context.fillText(label.toUpperCase(), x, y);
  context.fillStyle = palette.text;
  context.font = `700 ${valueSize}px Inter, Arial, sans-serif`;
  context.fillText(fitText(context, value, maxWidth), x, y + 27);
}

function drawBrand(
  context: CanvasRenderingContext2D,
  palette: Palette,
  brand: string,
  x: number,
  y: number
) {
  roundedRect(context, x, y, 52, 52, 13);
  context.fillStyle = palette.accentSoft;
  context.fill();
  context.strokeStyle = palette.accent;
  context.lineWidth = 2;
  context.stroke();
  context.strokeStyle = palette.accent;
  context.lineWidth = 5;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(x + 14, y + 28);
  context.lineTo(x + 23, y + 37);
  context.lineTo(x + 39, y + 17);
  context.stroke();

  context.fillStyle = palette.text;
  context.font = '800 25px Inter, Arial, sans-serif';
  context.fillText(brand, x + 68, y + 11);
}

function drawBackground(
  context: CanvasRenderingContext2D,
  palette: Palette,
  width: number,
  height: number
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette.background);
  gradient.addColorStop(1, palette.backgroundAccent);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.globalAlpha = 0.12;
  context.fillStyle = palette.accent;
  context.beginPath();
  context.arc(width - 80, 30, width * 0.22, 0, Math.PI * 2);
  context.fill();
  context.globalAlpha = 1;
}

function drawWideCard(context: CanvasRenderingContext2D, palette: Palette, data: FPSResultImageData) {
  drawBrand(context, palette, data.brand, 56, 44);
  context.fillStyle = palette.accent;
  context.font = '800 18px Inter, Arial, sans-serif';
  context.textAlign = 'right';
  context.fillText(data.title.toUpperCase(), 1144, 59);
  context.textAlign = 'left';

  context.fillStyle = palette.text;
  context.font = '800 38px Inter, Arial, sans-serif';
  context.fillText(fitText(context, data.game, 1088), 56, 124);

  drawPanel(context, palette, 56, 188, 526, 105);
  drawPanel(context, palette, 598, 188, 546, 105);
  drawLabelValue(context, palette, data.labels.cpu, data.cpu, 80, 211, 478, 23);
  drawLabelValue(context, palette, data.labels.gpu, data.gpu, 622, 211, 498, 23);

  drawPanel(context, palette, 56, 313, 410, 148, true);
  drawPanel(context, palette, 482, 313, 318, 148);
  drawPanel(context, palette, 816, 313, 328, 148);
  context.fillStyle = palette.muted;
  context.font = '700 16px Inter, Arial, sans-serif';
  context.fillText(data.labels.fpsRange.toUpperCase(), 82, 337);
  context.fillStyle = palette.accent;
  context.font = '900 52px Inter, Arial, sans-serif';
  context.fillText(data.fpsRange, 82, 369);
  context.fillStyle = palette.muted;
  context.font = '700 16px Inter, Arial, sans-serif';
  context.fillText(data.labels.onePercentLow.toUpperCase(), 508, 337);
  context.fillStyle = palette.text;
  context.font = '800 35px Inter, Arial, sans-serif';
  context.fillText(data.onePercentLow, 508, 379);
  context.fillStyle = palette.muted;
  context.font = '700 16px Inter, Arial, sans-serif';
  context.fillText(data.labels.limitingComponent.toUpperCase(), 842, 337);
  context.fillStyle = palette.success;
  context.font = '800 32px Inter, Arial, sans-serif';
  context.fillText(fitText(context, data.limitingComponent, 275), 842, 381);

  drawLabelValue(
    context,
    palette,
    data.labels.settings,
    `${data.resolution} • ${data.quality} • ${data.upscaling}`,
    56,
    490,
    760,
    20
  );
  drawLabelValue(context, palette, data.labels.modelVersion, data.modelVersion, 900, 490, 244, 20);

  context.fillStyle = palette.muted;
  context.font = '600 13px Inter, Arial, sans-serif';
  context.fillText(`${data.labels.shareUrl}: ${fitText(context, data.shareUrl, 1088)}`, 56, 557);
  context.font = '500 12px Inter, Arial, sans-serif';
  context.fillText(fitText(context, data.disclaimer, 1088), 56, 588);
}

function drawSquareCard(context: CanvasRenderingContext2D, palette: Palette, data: FPSResultImageData) {
  drawBrand(context, palette, data.brand, 64, 56);
  context.fillStyle = palette.accent;
  context.font = '800 18px Inter, Arial, sans-serif';
  context.textAlign = 'right';
  context.fillText(data.title.toUpperCase(), 1016, 71);
  context.textAlign = 'left';

  context.fillStyle = palette.text;
  context.font = '800 45px Inter, Arial, sans-serif';
  const gameLines = wrapText(context, data.game, 952, 2);
  gameLines.forEach((line, index) => context.fillText(line, 64, 145 + index * 52));

  drawPanel(context, palette, 64, 270, 952, 104);
  drawPanel(context, palette, 64, 390, 952, 104);
  drawLabelValue(context, palette, data.labels.cpu, data.cpu, 90, 294, 900, 25);
  drawLabelValue(context, palette, data.labels.gpu, data.gpu, 90, 414, 900, 25);

  drawPanel(context, palette, 64, 520, 952, 200, true);
  context.fillStyle = palette.muted;
  context.font = '700 17px Inter, Arial, sans-serif';
  context.fillText(data.labels.fpsRange.toUpperCase(), 94, 550);
  context.fillStyle = palette.accent;
  context.font = '900 72px Inter, Arial, sans-serif';
  context.fillText(data.fpsRange, 94, 590);
  drawLabelValue(context, palette, data.labels.onePercentLow, data.onePercentLow, 592, 550, 380, 30);
  drawLabelValue(context, palette, data.labels.limitingComponent, data.limitingComponent, 592, 635, 380, 30);

  drawPanel(context, palette, 64, 746, 952, 112);
  drawLabelValue(
    context,
    palette,
    data.labels.settings,
    `${data.resolution} • ${data.quality} • ${data.upscaling}`,
    90,
    771,
    680,
    22
  );
  drawLabelValue(context, palette, data.labels.modelVersion, data.modelVersion, 790, 771, 190, 22);

  context.fillStyle = palette.muted;
  context.font = '600 14px Inter, Arial, sans-serif';
  context.fillText(data.labels.shareUrl.toUpperCase(), 64, 892);
  context.font = '500 13px Inter, Arial, sans-serif';
  const urlLines = wrapText(context, data.shareUrl, 952, 3);
  urlLines.forEach((line, index) => context.fillText(line, 64, 919 + index * 19));
  context.font = '500 13px Inter, Arial, sans-serif';
  context.fillText(fitText(context, data.disclaimer, 952), 64, 1026);
}

export function getFPSResultImageFileName(game: string, layout: FPSResultImageLayout) {
  const safeGame = game
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'game';
  return `pcbuildcheck-${safeGame}-fps-${layout}.png`;
}

export function generateFPSResultImage(
  data: FPSResultImageData,
  theme: FPSResultImageTheme,
  layout: FPSResultImageLayout
) {
  const { width, height } = FPS_RESULT_IMAGE_DIMENSIONS[layout];
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) return Promise.reject(new Error('Canvas rendering is unavailable.'));

  const palette = palettes[theme];
  context.textBaseline = 'top';
  drawBackground(context, palette, width, height);
  if (layout === 'wide') drawWideCard(context, palette, data);
  else drawSquareCard(context, palette, data);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('PNG generation failed.'));
    }, 'image/png');
  });
}
