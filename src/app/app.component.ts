import { AfterViewInit, Component, ElementRef, OnChanges, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { CanvasCalculator } from 'app/canvas-calculator';
import { Map1dto2d } from 'app/map-1d-to-2d';
import { Spectra } from 'app/spectra';
import * as d3 from 'd3';

type d3Selection<T extends d3.BaseType> = d3.Selection<T, {}, null, undefined>;

const maxRandomValue = 256;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'Randvizer';

  @ViewChild('canvas') canvas: ElementRef;
  private canvasElement: HTMLElement;
  private host: d3Selection<HTMLElement>;
  
  private canvasCalculator = new CanvasCalculator();

  private randoms: number[] = [];
  get virtualPixelSize(): number { return this.canvasCalculator.virtualPixelSize; }
  get totalVirtualPixelHorizontalCount(): number { return this.canvasCalculator.totalVirtualPixelHorizontalCount; }
  get totalVirtualPixelVerticalCount(): number { return this.canvasCalculator.totalVirtualPixelVerticalCount; }
  get actualCanvasWidthPx(): number { return this.canvasCalculator.actualCanvasWidthPx; }
  get actualCanvasHeightPx(): number { return this.canvasCalculator.actualCanvasHeightPx; }
  get virtualPixelTotalCount(): number { return this.canvasCalculator.virtualPixelTotalCount; }

  constructor(private _http: Http) { }

  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
    this.host = d3.select(this.canvasElement);

    this.recalculate();
  }

  private recalculate(): void {
    if (!this.randoms || this.randoms.length !== this.virtualPixelTotalCount) {
      this.generateRandoms();
    }

    this.drawImageRepresentation(maxRandomValue);
  }

  private drawImageRepresentation(maxValue: number): void {
    const data = Map1dto2d.tabularize(this.randoms, this.totalVirtualPixelHorizontalCount);

    this.host.select("svg").remove();
    this.host
      .append("svg:svg")
        .attr('style', 'border: 1px dotted black')
        .attr("width", this.actualCanvasWidthPx)
        .attr("height", this.actualCanvasHeightPx)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
        .attr("fill", d => Spectra.numberInRangeToRgb(d.value, 0, maxValue))
        .attr("x", d => d.column * this.virtualPixelSize)
        .attr("y", d => d.row * this.virtualPixelSize)
        .attr("width", this.virtualPixelSize)
        .attr("height", this.virtualPixelSize);
  }

  private generateRandoms(): void {
    this.randoms = [];
    for (let counter = 1; counter <= this.virtualPixelTotalCount; counter++) {
      this.randoms.push(Math.round(Math.random() * maxRandomValue));
    }
  }

  fileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      // TODO Don't process way too large files or read it in parts...
      const fileReader = new FileReader();
      fileReader.onload = dataRead => {
        this.randoms = <number[]>JSON.parse(fileReader.result);

        const lengthOfData = this.randoms.length;
      
        const sideSizeInPx = 700;
        const maxNumberOfPixelsToDisplay = sideSizeInPx * sideSizeInPx;
        this.canvasCalculator.desiredCanvasHeightPx = sideSizeInPx;
        this.canvasCalculator.desiredCanvasWidthPx = sideSizeInPx;
        if (lengthOfData <= maxNumberOfPixelsToDisplay) {
          this.canvasCalculator.virtualPixelSize = sideSizeInPx / Math.sqrt(lengthOfData);
        } else {
          this.randoms.splice(maxNumberOfPixelsToDisplay);
          this.canvasCalculator.virtualPixelSize = 1;
        }

        this.drawImageRepresentation(Math.max(...this.randoms));
      };

      const file: File = fileList[0];
      fileReader.readAsText(file);
    }
  }
}
