import winston, { format } from 'winston';
import BrowserConsole from 'winston-transport-browserconsole';

const { combine, simple, label } = format;

function createLogger(name: Loggers) {
  return winston.createLogger({
    transports: [
      new BrowserConsole({
        format: combine(label({ label: name, message: true }), simple()),
        level: process.env.LOG_LVL,
      }),
    ],
  });
}

export enum Loggers {
  GRAPHQL = 'Graphql',
  AUTH = 'Auth',
  App = 'App',
  SERVICE_WORKER = 'Service Worker',
}

export default createLogger;
