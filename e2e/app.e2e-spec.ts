import { Enceladus.AppPage } from './app.po';

describe('enceladus.app App', () => {
  let page: Enceladus.AppPage;

  beforeEach(() => {
    page = new Enceladus.AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
