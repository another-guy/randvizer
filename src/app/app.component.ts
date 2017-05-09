import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Map1dto2d } from 'app/map-1d-to-2d';
import { Spectra } from 'app/spectra';
import * as d3 from 'd3';

type d3Selection<T extends d3.BaseType> = d3.Selection<T, {}, null, undefined>;

const maxValue = 256;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, AfterViewInit {
  title = 'Randvizer';

  @ViewChild('canvas') canvas: ElementRef;
  private canvasElement: HTMLElement;
  private host: d3Selection<HTMLElement>;

  @Input() radScale: number = 9;
  @Input() desiredCanvasWidth = 300;
  @Input() desiredCanvasHeight = 300;
  
  private randoms: number[] = [];
  get nFitHoriz(): number { return Math.floor(this.desiredCanvasWidth / this.radScale); }
  get nFitVert(): number { return Math.floor(this.desiredCanvasHeight / this.radScale); }
  get actualCanvasWidth(): number { return this.nFitHoriz * this.radScale; }
  get actualCanvasHeight(): number { return this.nFitVert * this.radScale; }
  get total(): number { return this.nFitHoriz * this.nFitVert; }

  constructor(private _http: Http) { }

  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
    this.host = d3.select(this.canvasElement);

    this.recalculate();
  }

  ngOnChanges(): void {
    this.recalculate();
  }

  private recalculate(): void {
    this.drawImageRepresentation();
  }

  private drawImageRepresentation(): void {
    if (!this.randoms || this.randoms.length <= 0) {
      this.randoms = this.generateRandoms();
    }

    const data = Map1dto2d.tabularize(this.randoms, this.nFitHoriz);

    this.host.select("svg").remove();
    this.host
      .append("svg:svg")
        .attr('style', 'border: 1px dotted black')
        .attr("width", this.actualCanvasWidth)
        .attr("height", this.actualCanvasHeight)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
        .attr("fill", d => Spectra.numberInRangeToRgb(d.value, 0, maxValue))
        .attr("x", d => d.column * this.radScale)
        .attr("y", d => d.row * this.radScale)
        .attr("width", this.radScale)
        .attr("height", this.radScale);
  }

  private generateRandoms(): number[] {
    const randomItems = [];
    for (let counter = 1; counter < this.total; counter++) {
      randomItems.push(Math.round(Math.random() * maxValue));
    }
    return randomItems;
  }

  fileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = dataRead => {
        const dataRetrieved = <number[]>JSON.parse(fileReader.result);
        this.randoms = dataRetrieved;
      };

      const file: File = fileList[0];
      fileReader.readAsText(file);
    }
  }
}
