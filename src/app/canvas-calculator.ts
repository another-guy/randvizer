export class CanvasCalculator {
  private _virtualPixelSize: number = 9;
  get virtualPixelSize(): number { return this._virtualPixelSize; }
  set virtualPixelSize(newValue: number) {
    if (newValue < 0) {
      return;
    }
    this._virtualPixelSize = newValue;
  }

  private _desiredCanvasWidthPx = 300;
  get desiredCanvasWidthPx(): number { return this._desiredCanvasWidthPx; }
  set desiredCanvasWidthPx(newValue: number) {
    if (newValue < 1) {
      return;
    }
    this._desiredCanvasWidthPx = newValue;
  }

  private _desiredCanvasHeightPx = 300;
  get desiredCanvasHeightPx(): number { return this._desiredCanvasHeightPx; }
  set desiredCanvasHeightPx(newValue: number) {
    if (newValue < 1) {
      return;
    }
    this._desiredCanvasHeightPx = newValue;
  }

  get totalVirtualPixelHorizontalCount(): number {
    return Math.floor(this.desiredCanvasWidthPx / this.virtualPixelSize);
  }

  get totalVirtualPixelVerticalCount(): number {
    return Math.floor(this.desiredCanvasHeightPx / this.virtualPixelSize);
  }

  get actualCanvasWidthPx(): number {
    return this.virtualPixelSize * this.totalVirtualPixelHorizontalCount;
  }

  get actualCanvasHeightPx(): number {
    return this.virtualPixelSize * this.totalVirtualPixelVerticalCount;
  }

  get virtualPixelTotalCount(): number {
    return this.totalVirtualPixelVerticalCount * this.totalVirtualPixelHorizontalCount;
  }
}