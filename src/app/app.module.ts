import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SentryErrorHandler } from './sentry-error-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {}
