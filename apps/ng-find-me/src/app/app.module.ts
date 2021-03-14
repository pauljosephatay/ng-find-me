import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgFindMeFeatureShellModule } from '@findme/ng-find-me/feature-shell';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import {
  iconsPathFactory,
  TUI_ICONS_PATH,
  TuiRootModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    TuiRootModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgFindMeFeatureShellModule,
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
