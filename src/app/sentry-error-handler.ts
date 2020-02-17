import { Injectable, ErrorHandler } from '@angular/core';
import * as Sentry from '@sentry/browser';

const VERSION = (window as any).version;
console.log('VERSION', VERSION);

Sentry.init({
  dsn:
    'https://7a1b1091ca034a64ace2d5a030fab531@sentry-pitc-sentry09-test.ocp.puzzle.ch/24',
  // dsn: 'https://7a1b1091ca034a64ace2d5a030fab531@sentry.puzzle.ch/24',
  // dsn: 'https://fa84792d5cc24bed859936aeadabaf15@sentry.io/1819492',
  environment: 'integration',
  release: VERSION
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}
