import { by, element } from 'protractor';

export class DashboardPage {
  get title() {
    return element(by.css('p'));
  }
}
