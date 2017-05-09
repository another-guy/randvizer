import { Map1dto2d } from './map-1d-to-2d';

let a: any;
let b: any;
let c: any;
let d: any;
let e: any;

describe('Map1dto2d', () => {

  beforeEach(() => {
    a = { 'value': 'a' };
    b = { 'value': 'b' };
    c = { 'value': 'c' };
    d = { 'value': 'd' };
    e = { 'value': 'e' };
  });

  it('maps correctly for wrong (0) columns', () => {
    expect(() => Map1dto2d.tabularize([ a, b, c, d, e ], 0)).toThrow();
  });

  it('maps correctly for 1 column', () => {
    [a, b, c, d, e] = Map1dto2d.tabularize([ a, b, c, d, e ], 1);

    expect(a.row).toBe(0);
    expect(a.column).toBe(0);
    expect(b.row).toBe(1);
    expect(b.column).toBe(0);
    expect(c.row).toBe(2);
    expect(c.column).toBe(0);
    expect(d.row).toBe(3);
    expect(d.column).toBe(0);
    expect(e.row).toBe(4);
    expect(e.column).toBe(0);
  });

  it('maps correctly for 2 columns', () => {
    [a, b, c, d, e] = Map1dto2d.tabularize([ a, b, c, d, e ], 2);

    expect(a.row).toBe(0);
    expect(a.column).toBe(0);
    expect(b.row).toBe(0);
    expect(b.column).toBe(1);
    expect(c.row).toBe(1);
    expect(c.column).toBe(0);
    expect(d.row).toBe(1);
    expect(d.column).toBe(1);
    expect(e.row).toBe(2);
    expect(e.column).toBe(0);
  });

  it('maps correctly for 3 columns', () => {
    [a, b, c, d, e] = Map1dto2d.tabularize([ a, b, c, d, e ], 3);

    expect(a.row).toBe(0);
    expect(a.column).toBe(0);
    expect(b.row).toBe(0);
    expect(b.column).toBe(1);
    expect(c.row).toBe(0);
    expect(c.column).toBe(2);
    expect(d.row).toBe(1);
    expect(d.column).toBe(0);
    expect(e.row).toBe(1);
    expect(e.column).toBe(1);
  });

  it('maps correctly for 4 columns', () => {
    [a, b, c, d, e] = Map1dto2d.tabularize([ a, b, c, d, e ], 4);

    expect(a.row).toBe(0);
    expect(a.column).toBe(0);
    expect(b.row).toBe(0);
    expect(b.column).toBe(1);
    expect(c.row).toBe(0);
    expect(c.column).toBe(2);
    expect(d.row).toBe(0);
    expect(d.column).toBe(3);
    expect(e.row).toBe(1);
    expect(e.column).toBe(0);
  });

  it('maps correctly for 5 columns', () => {
    [a, b, c, d, e] = Map1dto2d.tabularize([ a, b, c, d, e ], 5);

    expect(a.row).toBe(0);
    expect(a.column).toBe(0);
    expect(b.row).toBe(0);
    expect(b.column).toBe(1);
    expect(c.row).toBe(0);
    expect(c.column).toBe(2);
    expect(d.row).toBe(0);
    expect(d.column).toBe(3);
    expect(e.row).toBe(0);
    expect(e.column).toBe(4);
  });

  it('maps correctly for 6 columns', () => {
    [a, b, c, d, e] = Map1dto2d.tabularize([ a, b, c, d, e ], 6);

    expect(a.row).toBe(0);
    expect(a.column).toBe(0);
    expect(b.row).toBe(0);
    expect(b.column).toBe(1);
    expect(c.row).toBe(0);
    expect(c.column).toBe(2);
    expect(d.row).toBe(0);
    expect(d.column).toBe(3);
    expect(e.row).toBe(0);
    expect(e.column).toBe(4);
  });

});
