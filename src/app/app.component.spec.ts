import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

const expectedTitle = "Randvizer";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title '${expectedTitle}'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(expectedTitle);
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(expectedTitle);
  }));

  describe('tabularization', () => {
    it('should work', () => {
      const component = TestBed.createComponent(AppComponent).componentInstance;
      const data = [ { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 } ];
      const result = component.tabularize(data, 3);
      expect(result.length).toBe(data.length);
      
      expect(result[0].row).toBe(0);
      expect(result[0].column).toBe(0);

      expect(result[1].row).toBe(0);
      expect(result[1].column).toBe(1);

      expect(result[2].row).toBe(0);
      expect(result[2].column).toBe(2);

      expect(result[3].row).toBe(1);
      expect(result[3].column).toBe(0);

      expect(result[4].row).toBe(1);
      expect(result[4].column).toBe(1);

      expect(result[5].row).toBe(1);
      expect(result[5].column).toBe(2);

      expect(result[6].row).toBe(2);
      expect(result[6].column).toBe(0);

      expect(result[7].row).toBe(2);
      expect(result[7].column).toBe(1);

      expect(result[8].row).toBe(2);
      expect(result[8].column).toBe(2);
    });
  })
});
