import { AfterViewInit, Component, ElementRef, OnChanges, ViewChild } from '@angular/core';
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
  private svgSelection: d3Selection<Element | d3.EnterElement | Document | Window >;

  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
    this.host = d3.select(this.canvasElement);

    this.redo();
  }

  ngOnChanges(): void {
    this.redo();
  }

  private redo(): void {
    this.drawImageRepresentation();
    //this.drawTable();
  }

  private drawImageRepresentation(): void {

    const canvasWidth = 1350;
    const canvasHeight = 300;
    const radScale = 1;

    const randomItems = [];
    for (let counter = 1; counter < canvasWidth * canvasHeight; counter++) {
      randomItems.push(Math.round(Math.random() * maxValue));
    }
    const rawRandoms = randomItems
      .map((item, index) => <DataPoint>{
        value: item,
        column: index,
        row: 0
      });
    const data = this.tabularize(rawRandoms, canvasWidth);

    this.host
      .append("svg:svg")
        .attr('style', 'border: 1px dotted black')
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
      //.selectAll('circle')
      .selectAll('rect')

      .data(data)
      .enter()
      // .append('circle')
      //   .attr("fill", d => numberInRangeToRgb(d.value, 0, maxValue))
      //   .attr("r", radScale)
      //   .attr("cx", d => radScale + (2 * radScale * d.column))
      //   .attr("cy", d => radScale + (2 * radScale * d.row))

      .append('rect')
        .attr("fill", d => numberInRangeToRgb(d.value, 0, maxValue))
        .attr("x", d => d.column * radScale)
        .attr("y", d => d.row * radScale)
        .attr("width", radScale)
        .attr("height", radScale)
      ;
  }

  tabularize(data: DataPoint[], rowLength: number): DataPoint[] {
    return data.map((item, index) =>
      <DataPoint>{
        column: index % rowLength,
        row: Math.floor(index / rowLength),
        value: item.value
      });
  }

  // private drawTable(): void {
  //   var dataset = [];
  //   for (let i = 0; i < 5; i++) {
  //     var tmpDataset = []
  //     for (let j = 0; j < 3; j++) {
  //       tmpDataset.push("Row:" + i + ",Col:" + j);
  //     }
  //     dataset.push(tmpDataset);
  //   }

  //   this.host
  //   .append("table")
  //   .style("border-collapse", "collapse")
  //   .style("border", "2px black solid")
    
  //   .selectAll("tr")
  //   .data(dataset)
  //   .enter()
  //   .append("tr")
    
  //   .selectAll("td")
  //   .data(d => d)
  //   .enter()
  //   .append("td")
  //   .style("border", "1px black solid")
  //   .style("padding", "10px")
  //   .on("mouseover", function(){d3.select(this).style("background-color", "aliceblue")})
  //   .on("mouseout", function(){d3.select(this).style("background-color", "white")})
  //   .text(d => <string>d)
  //   .style("font-size", "12px");
  // }
}

export class DataPoint {
  value: number;
  row: number;
  column: number;
}