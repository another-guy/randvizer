import { Spectra } from 'app/spectra';

describe('Spectra', () => {

  function title(testCase: any): string {
    return `works for ${JSON.stringify(testCase)} test case`;
  }

  describe('numberInRangeToRgb', () => {
    [
      { value: 0, min: 0, max: 10, expectedResult: '#000000' },
      { value: 5, min: 0, max: 10, expectedResult: '#00ff92' },
      { value: 10, min: 0, max: 10, expectedResult: '#ff0000' },
      { value: 0, min: -10, max: 0, expectedResult: '#ff0000' },
      { value: -5, min: -10, max: 0, expectedResult: '#00ff92' },
      { value: -10, min: -10, max: 0, expectedResult: '#000000' },
      { value: -10, min: -10, max: 10, expectedResult: '#000000' },
      { value: 0, min: -10, max: 10, expectedResult: '#00ff92' },
      { value: 10, min: -10, max: 10, expectedResult: '#ff0000' }
    ].forEach(testCase => {
      it(title(testCase), () => {
        const { value, min, max, expectedResult } = testCase;
        expect(Spectra.numberInRangeToRgb(value, min, max)).toEqual(expectedResult);
      });
    });
  });

  describe('waveLengthFromDataPoint', () => {
    [
      { value: 10, min: 10, max: 20, expectedResult: 350 },
      { value: 13, min: 10, max: 20, expectedResult: 440 },
      { value: 17, min: 10, max: 20, expectedResult: 560 },
      { value: 20, min: 10, max: 20, expectedResult: 650 }
    ].forEach(testCase => {
      it(title(testCase), () => {
        const { value, min, max, expectedResult } = testCase;
        expect(Spectra.waveLengthFromDataPoint(value, min, max)).toBeCloseTo(expectedResult);
      });
    });
  });

  describe('waveLengthToRGB', () => {
    [
      { waveLength: 300, expectedResult: [0, 0, 0] },
      { waveLength: 380, expectedResult: [97, 0, 97] },
      { waveLength: 450, expectedResult: [0, 70, 255] },
      { waveLength: 580, expectedResult: [255, 255, 0] },
      { waveLength: 690, expectedResult: [255, 0, 0] },
      { waveLength: 780, expectedResult: [0, 0, 0] },
      { waveLength: 900, expectedResult: [0, 0, 0] }
    ].forEach(testCase => {
      it(title(testCase), () => {
        const { waveLength, expectedResult } = testCase;
        expect(Spectra.waveLengthToRGB(waveLength)).toEqual(expectedResult);
      });
    });
  });

  describe('rgbFromWaveLength', () => {
    [
      // (-Inf..380) or [780..+Inf) -> [0, 0, 0]
      { waveLength: -100, expectedResult: [0, 0, 0] },
      { waveLength: 0, expectedResult: [0, 0, 0] },
      { waveLength: 100, expectedResult: [0, 0, 0] },
      { waveLength: 379, expectedResult: [0, 0, 0] },
      { waveLength: 780, expectedResult: [0, 0, 0] },
      { waveLength: 800, expectedResult: [0, 0, 0] },
      { waveLength: +10000, expectedResult: [0, 0, 0] },

      // [380..440) -> [- (waveLengthInNanoMeters - 440) / 60, 0, 1]
      { waveLength: 380, expectedResult: [1, 0, 1] },
      { waveLength: 410, expectedResult: [0.5, 0, 1] },
      { waveLength: 439, expectedResult: [0.016666666666666666, 0, 1] },

      // [440..490) -> [0, (waveLengthInNanoMeters - 440) / 50, 1]
      { waveLength: 440, expectedResult: [0, 0, 1] },
      { waveLength: 465, expectedResult: [0, 0.5, 1] },
      { waveLength: 489, expectedResult: [0, 0.98, 1] },

      // [490..510) -> [0, 1, - (waveLengthInNanoMeters - 510) / 20]
      { waveLength: 490, expectedResult: [0, 1, 1] },
      { waveLength: 500, expectedResult: [0, 1, 0.5] },
      { waveLength: 509, expectedResult: [0, 1, 0.05] },

      // [510..580) -> [(waveLengthInNanoMeters - 510) / 70, 1, 0]
      { waveLength: 510, expectedResult: [0, 1, 0] },
      { waveLength: 545, expectedResult: [0.5, 1, 0] },
      { waveLength: 579, expectedResult: [0.9857142857142858, 1, 0] },

      // [580..645) -> [1, - (waveLengthInNanoMeters - 645) / 65, 0]
      { waveLength: 580, expectedResult: [1, 1, 0] },
      { waveLength: 612.5, expectedResult: [1, 0.5, 0] },
      { waveLength: 644, expectedResult: [1, 0.01538461538461538461538461538462, 0] },

      // [645..780) -> [1, 0, 0]
      { waveLength: 645, expectedResult: [1, 0, 0] },
      { waveLength: 700, expectedResult: [1, 0, 0] },
      { waveLength: 779, expectedResult: [1, 0, 0] }
    ].forEach(testCase => {
      it(title(testCase), () => {
        const { waveLength, expectedResult } = testCase;
        expect(Spectra.rgbFromWaveLength(waveLength)).toEqual(expectedResult);
      });
    });
  });

  describe('factorFromWaveLength', () => {
    [
      // (-Inf..380) or [780..+Inf) -> 0
      { waveLength: -100, expectedFactor: 0 },
      { waveLength: 0, expectedFactor: 0 },
      { waveLength: 379, expectedFactor: 0 },
      { waveLength: 780, expectedFactor: 0 },
      { waveLength: 1024, expectedFactor: 0 },

      // [380..420) -> 0.3 + 0.7 * (waveLengthInNanoMeters - 380) / 40
      { waveLength: 380, expectedFactor: 0.3 },
      { waveLength: 400, expectedFactor: 0.65 },
      { waveLength: 419, expectedFactor: 0.9825 },

      // [420..700) -> 1
      { waveLength: 420, expectedFactor: 1 },
      { waveLength: 500, expectedFactor: 1 },
      { waveLength: 600, expectedFactor: 1 },
      { waveLength: 699, expectedFactor: 1 },

      // [700..780) -> 0.3 + 0.7 * (780 - waveLengthInNanoMeters) / 80
      { waveLength: 700, expectedFactor: 1 },
      { waveLength: 740, expectedFactor: 0.65 },
      { waveLength: 779, expectedFactor: 0.30875 }
    ].forEach(testCase => {
      it(title(testCase), () => {
        const { waveLength, expectedFactor } = testCase;
        expect(Spectra.factorFromWaveLength(waveLength)).toBeCloseTo(expectedFactor);
      });
    });
  });

  describe('adjust', () => {
    [
      { color: 1, factor: 2, expectedResult: 444 },
      { color: 2, factor: 3, expectedResult: 1069 },
      { color: 3, factor: 4, expectedResult: 1862 },
      { color: 4, factor: 5, expectedResult: 2801 },
      { color: 0, factor: 100, expectedResult: 0 },
      { color: 0, factor: 0, expectedResult: 0 },
      { color: 0, factor: -100, expectedResult: 0 }
    ].forEach(testCase => {
      it(title(testCase), () => {
        const { color, factor, expectedResult } = testCase;
        expect(Spectra.adjust(color, factor)).toBe(expectedResult);
      });
    });
  });

});
