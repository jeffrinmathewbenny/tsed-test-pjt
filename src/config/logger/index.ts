import { $log, PlatformLoggerSettings } from '@tsed/common';
import { isProduction } from '../envs/index';

if (isProduction) {
  $log.appenders.set('stdout', {
    type: 'stdout',
    levels: ['info', 'debug'],
    layout: {
      type: 'json',
    },
  });

  $log.appenders.set('stderr', {
    levels: ['trace', 'fatal', 'error', 'warn'],
    type: 'stderr',
    layout: {
      type: 'json',
    },
  });
}

$log.appenders.set('all-logs', {
  type: 'file',
  filename: `${__dirname}../../../../logs/all-logs.log`,
  levels: ['trace', 'fatal', 'error', 'warn', 'info', 'debug'],
  maxLogSize: 10485760,
  backups: 5,
  compress: true,
  layout: {
    type: 'json',
    separator: ',',
  },
});

$log.appenders.set('error-logs', {
  type: 'file',
  filename: `${__dirname}../../../../logs/error-logs.log`,
  levels: ['fatal', 'error'],
  maxLogSize: 10485760,
  backups: 5,
  compress: true,
  layout: {
    type: 'json',
    separator: ',',
  },
});

export default <PlatformLoggerSettings>{
  disableRoutesSummary: isProduction,
};
