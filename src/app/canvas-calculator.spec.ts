import { CanvasCalculator } from 'app/canvas-calculator';

type CanvasBase = { virtualPixelSize: number, desiredCanvasWidthPx: number, desiredCanvasHeightPx: number };

describe('CanvasCalculator', () => {
  function title(testCase: any): string {
    return `works for ${JSON.stringify(testCase)} test case`;
  }
  
  let sut: CanvasCalculator;

  beforeEach(() => {
    sut = new CanvasCalculator();
  });

  function setup(testCase: CanvasBase): void {
    sut.virtualPixelSize = testCase.virtualPixelSize;
    sut.desiredCanvasWidthPx = testCase.desiredCanvasWidthPx;
    sut.desiredCanvasHeightPx = testCase.desiredCanvasHeightPx;
  }

  describe('totalVirtualPixelHorizontalCount', () => {
    [
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 100 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 1, virtualPixelSize: 3, expected: 100 },
      { desiredCanvasWidthPx: 30, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 10 },
      { desiredCanvasWidthPx: 3, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 1 },
      { desiredCanvasWidthPx: 10, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 3 },
      { desiredCanvasWidthPx: 11, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 3 }
    ].forEach(testCase => {
      const { desiredCanvasWidthPx, desiredCanvasHeightPx, virtualPixelSize, expected } = testCase;
      it(title(testCase), () => {
        setup(testCase);
        expect(sut.totalVirtualPixelHorizontalCount).toBe(expected);
      });
    });
  });

  describe('totalVirtualPixelVerticalCount', () => {
    [
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 100 },
      { desiredCanvasWidthPx: 1, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 100 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 30, virtualPixelSize: 3, expected: 10 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 3, virtualPixelSize: 3, expected: 1 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 10, virtualPixelSize: 3, expected: 3 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 11, virtualPixelSize: 3, expected: 3 }
    ].forEach(testCase => {
      const { desiredCanvasWidthPx, desiredCanvasHeightPx, virtualPixelSize, expected } = testCase;
      it(title(testCase), () => {
        setup(testCase);
        expect(sut.totalVirtualPixelVerticalCount).toBe(expected);
      });
    });
  });

  describe('actualCanvasWidthPx', () => {
    [
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 300 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 1, virtualPixelSize: 3, expected: 300 },
      { desiredCanvasWidthPx: 30, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 30 },
      { desiredCanvasWidthPx: 3, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 3 },
      { desiredCanvasWidthPx: 10, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 9 },
      { desiredCanvasWidthPx: 11, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 9 }
    ].forEach(testCase => {
      const { desiredCanvasWidthPx, desiredCanvasHeightPx, virtualPixelSize, expected } = testCase;
      it(title(testCase), () => {
        setup(testCase);
        expect(sut.actualCanvasWidthPx).toBe(expected);
      });
    });
  });

  describe('actualCanvasHeightPx', () => {
    [
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 300 },
      { desiredCanvasWidthPx: 1, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 300 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 30, virtualPixelSize: 3, expected: 30 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 3, virtualPixelSize: 3, expected: 3 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 10, virtualPixelSize: 3, expected: 9 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 11, virtualPixelSize: 3, expected: 9 }
    ].forEach(testCase => {
      const { desiredCanvasWidthPx, desiredCanvasHeightPx, virtualPixelSize, expected } = testCase;
      it(title(testCase), () => {
        setup(testCase);
        expect(sut.actualCanvasHeightPx).toBe(expected);
      });
    });
  });

  describe('virtualPixelTotalCount', () => {
    [
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 10000 },
      { desiredCanvasWidthPx: 1, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 0 },
      { desiredCanvasWidthPx: 3, desiredCanvasHeightPx: 300, virtualPixelSize: 3, expected: 100 },
      { desiredCanvasWidthPx: 5, desiredCanvasHeightPx: 5, virtualPixelSize: 3, expected: 1 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 30, virtualPixelSize: 3, expected: 1000 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 3, virtualPixelSize: 3, expected: 100 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 10, virtualPixelSize: 3, expected: 300 },
      { desiredCanvasWidthPx: 300, desiredCanvasHeightPx: 11, virtualPixelSize: 3, expected: 300 }
    ].forEach(testCase => {
      const { desiredCanvasWidthPx, desiredCanvasHeightPx, virtualPixelSize, expected } = testCase;
      it(title(testCase), () => {
        setup(testCase);
        expect(sut.virtualPixelTotalCount).toBe(expected);
      });
    });
  });

});