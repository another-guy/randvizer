import { DataPoint } from 'app/data-point';

export class Map1dto2d {

  static tabularize<T>(data: T[], rowLength: number): DataPoint<T>[] {
    if (rowLength < 1) throw new Error(`Can not tabularize for row of length less than 1, was ${rowLength}`);

    return data.map((item, index) => {
      const dataPoint = <DataPoint<T>>{
        column: index % rowLength,
        row: Math.floor(index / rowLength),
        value: item
      };
      return dataPoint;
    });
  }
  
}
