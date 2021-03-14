/* eslint-disable @angular-eslint/component-selector */
import { SearchInputComponent } from './search-input.component';
import { TuiLetModule } from '@taiga-ui/cdk';
import { ReactiveFormsModule } from '@angular/forms';
import { render, waitFor } from '@testing-library/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { getAllUsers } from '@findme/ng-find-me/users/data-access/users-state';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchInputComponent', () => {
  const users = [{ name: 'John' }, { name: 'Jane' }];
  const init = async () =>
    render(SearchInputComponent, {
      declarations: [
        MockInputComponent,
        MockListComponent,
        MockTuiDataDirective,
        MockAvatarComponent,
      ],
      imports: [ReactiveFormsModule, TuiLetModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({
          selectors: [{ selector: getAllUsers, value: [...users] }],
        }),
      ],
    });

  test('should render', async () => {
    const comp = await init();
    await waitFor(() => comp.getByText('John'));
  });
});

import {
  Component,
  Directive,
  ElementRef,
  forwardRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  template: ` <ng-content></ng-content>`,
  selector: 'tui-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MockInputComponent),
      multi: true,
    },
  ],
})
class MockInputComponent implements ControlValueAccessor {
  nativeFocusableElement = { blur: jest.fn() };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerOnChange(fn: any): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerOnTouched(fn: any): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  writeValue(obj: any): void {}
}

@Component({
  template: `<ng-content></ng-content>`,
  selector: 'tui-data-list',
})
class MockListComponent {}

@Component({
  template: `avatar`,
  selector: 'tui-avatar',
})
class MockAvatarComponent {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tuiDataList]',
})
class MockTuiDataDirective {
  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[tuiOption]',
})
class MockTuiOptionDirective {
  @Input() value;
}
