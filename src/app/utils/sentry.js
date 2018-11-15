import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://466d7a4e8d174006b5449330cc18e4cc@sentry.io/1323316'
});

const initErrorLogging = () => {
  window.onerror = (e) => {
    Sentry.captureException(e);
  };
};

export {
  initErrorLogging
};
