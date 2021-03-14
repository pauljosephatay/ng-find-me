import { AppComponent } from './app.component';
import { render } from '@testing-library/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from '@findme/ng-find-me/utils-testing';

describe('AppComponent', () => {
  test('should render', async () => {
    await render(AppComponent, {
      declarations: [
        MockComponent({
          selector: 'tui-root',
          template: `<ng-content></ng-content>`,
        }),
      ],
      imports: [RouterTestingModule],
    });
  });
});
