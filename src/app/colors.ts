export function numberInRangeToRgb(value: number, min: number, max: number): string {
  const waveLength = waveLengthFromDataPoint(value, min, max);
  const rgb = waveLengthToRGB(waveLength);

  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];

  const toHex = (nToHex: number) => {
    const hexValue = nToHex.toString(16);
    return hexValue.length === 1 ? `0${hexValue}` : hexValue;
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function waveLengthFromDataPoint(value: number, minValue: number, maxValue: number): number {
  const minVisibleWaveLength = 350;
  const maxVisibleWaveLength = 650;
  return (value - minValue) / (maxValue - minValue) * (maxVisibleWaveLength - minVisibleWaveLength) + minVisibleWaveLength; 
}

export function waveLengthToRGB(waveLengthInNanoMeters: number): number[] {
  let r;
  let g;
  let b;

  if (waveLengthInNanoMeters >= 380 && waveLengthInNanoMeters < 440) {
    r = - (waveLengthInNanoMeters - 440) / (440 - 380);
    g = 0;
    b = 1;
  } else if (waveLengthInNanoMeters >= 440 && waveLengthInNanoMeters < 490) {
    r = 0;
    g = (waveLengthInNanoMeters - 440) / (490 - 440);
    b = 1;
  } else if (waveLengthInNanoMeters >= 490 && waveLengthInNanoMeters < 510) {
    r = 0;
    g = 1;
    b = - (waveLengthInNanoMeters - 510) / (510 - 490);
  } else if (waveLengthInNanoMeters >= 510 && waveLengthInNanoMeters < 580) {
    r = (waveLengthInNanoMeters - 510) / (580 - 510);
    g = 1;
    b = 0;
  } else if (waveLengthInNanoMeters >= 580 && waveLengthInNanoMeters < 645) {
    r = 1;
    g = - (waveLengthInNanoMeters - 645) / (645 - 580);
    b = 0;
  } else if (waveLengthInNanoMeters >= 645 && waveLengthInNanoMeters < 780) {
    r = 1;
    g = 0;
    b = 0;
  } else {
    r = 0;
    g = 0;
    b = 0;
  }

  let factor;
  if (waveLengthInNanoMeters >= 380 && waveLengthInNanoMeters < 420) {
    factor = 0.3 + 0.7 * (waveLengthInNanoMeters - 380) / (420 - 380);
  } else if (waveLengthInNanoMeters >= 420 && waveLengthInNanoMeters < 700) {
    factor = 1;
  } else if (waveLengthInNanoMeters >= 700 && waveLengthInNanoMeters < 780) {
    factor = 0.3 + 0.7 * (780 - waveLengthInNanoMeters) / (780 - 700);
  } else {
    factor = 0;
  }

  return [ adjust(r, factor), adjust(g, factor), adjust(b, factor) ];
}

export function adjust(color: number, factor: number): number {
  const gamma = 0.8;
  const intensityMax = 255;
  return color === 0 ? 0 : Math.round(intensityMax * Math.pow(color * factor, gamma));
}
