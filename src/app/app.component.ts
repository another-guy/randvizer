import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { numberInRangeToRgb } from 'app/colors';
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
  
  get nFitHoriz(): number { return Math.floor(this.desiredCanvasWidth / this.radScale); }
  get nFitVert(): number { return Math.floor(this.desiredCanvasHeight / this.radScale); }
  get actualCanvasWidth(): number { return this.nFitHoriz * this.radScale; }
  get actualCanvasHeight(): number { return this.nFitVert * this.radScale; }
  get total(): number { return this.nFitHoriz * this.nFitVert; }

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
    const randomItems = [];
    for (let counter = 1; counter < this.total; counter++) {
      randomItems.push(Math.round(Math.random() * maxValue));
    }
    const rawRandoms = randomItems
      .map((item, index) => <DataPoint>{
        value: item,
        column: index,
        row: 0
      });
    const data = this.tabularize(rawRandoms, this.nFitHoriz);

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
        .attr("fill", d => numberInRangeToRgb(d.value, 0, maxValue))
        .attr("x", d => d.column * this.radScale)
        .attr("y", d => d.row * this.radScale)
        .attr("width", this.radScale)
        .attr("height", this.radScale);
  }

  tabularize(data: DataPoint[], rowLength: number): DataPoint[] {
    return data.map((item, index) =>
      <DataPoint>{
        column: index % rowLength,
        row: Math.floor(index / rowLength),
        value: item.value
      });
  }
}

export class DataPoint {
  value: number;
  row: number;
  column: number;
}