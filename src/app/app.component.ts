import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { captureMessage, Severity } from '@sentry/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tech-kafi-sentry';

  constructor(private http: HttpClient) {}

  executeRequest() {
    const url =
      'https://techkafi-backend-pitc-techkafi-sentry.ose3.puzzle.ch/api/get';
    this.http
      .get(url)
      .subscribe(
        res => console.log('success response:', res),
        error => console.error('error response:', error)
      );
  }

  badFunction() {
    encodeURI('\uD800');
  }

  anotherBadFunction() {
    throw new Error('Another bad!!!');
  }

  customMessage() {
    captureMessage('This is not good', Severity.Info);
  }
}
