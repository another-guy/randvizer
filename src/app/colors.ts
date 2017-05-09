/*
  http://stackoverflow.com/a/2376159/482868
  http://www.efg2.com/Lab/ScienceAndEngineering/Spectra.htm
  http://www.physics.sfasu.edu/astro/color.html
*/

export function numberInRangeToRgb(value: number, min: number, max: number): string {
  const waveLength = waveLengthFromDataPoint(value, min, max);
  const [r, g, b] = waveLengthToRGB(waveLength);
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
  const rgb = rgbFromWaveLength(waveLengthInNanoMeters);
  const factor = factorFromWaveLength(waveLengthInNanoMeters);
  return rgb.map(f => adjust(f, factor));
}

export function rgbFromWaveLength(waveLengthInNanoMeters: number): number[] {
  if (waveLengthInNanoMeters >= 380 && waveLengthInNanoMeters < 440) {
    return [- (waveLengthInNanoMeters - 440) / (440 - 380), 0, 1];
  } else if (waveLengthInNanoMeters >= 440 && waveLengthInNanoMeters < 490) {
    return [0, (waveLengthInNanoMeters - 440) / (490 - 440), 1];
  } else if (waveLengthInNanoMeters >= 490 && waveLengthInNanoMeters < 510) {
    return [0, 1, - (waveLengthInNanoMeters - 510) / (510 - 490)];
  } else if (waveLengthInNanoMeters >= 510 && waveLengthInNanoMeters < 580) {
    return [(waveLengthInNanoMeters - 510) / (580 - 510), 1, 0];
  } else if (waveLengthInNanoMeters >= 580 && waveLengthInNanoMeters < 645) {
    return [1, - (waveLengthInNanoMeters - 645) / (645 - 580), 0];
  } else if (waveLengthInNanoMeters >= 645 && waveLengthInNanoMeters < 780) {
    return [1, 0, 0];
  } else {
    return [0, 0, 0];
  }
}

export function factorFromWaveLength(waveLengthInNanoMeters: number): number {
  if (waveLengthInNanoMeters >= 380 && waveLengthInNanoMeters < 420) {
    return 0.3 + 0.7 * (waveLengthInNanoMeters - 380) / (420 - 380);
  } else if (waveLengthInNanoMeters >= 420 && waveLengthInNanoMeters < 700) {
    return 1;
  } else if (waveLengthInNanoMeters >= 700 && waveLengthInNanoMeters < 780) {
    return 0.3 + 0.7 * (780 - waveLengthInNanoMeters) / (780 - 700);
  } else {
    return 0;
  }
}

export function adjust(color: number, factor: number): number {
  const gamma = 0.8;
  const intensityMax = 255;
  return color === 0 ? 0 : Math.round(intensityMax * Math.pow(color * factor, gamma));
}
