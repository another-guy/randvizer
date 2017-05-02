import { RandvizerPage } from './app.po';

describe('randvizer App', () => {
  let page: RandvizerPage;

  beforeEach(() => {
    page = new RandvizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
