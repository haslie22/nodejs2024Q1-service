import { join, basename, extname } from 'path';
import { existsSync, mkdirSync, appendFile, stat, rename } from 'fs';
import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { LogLevel } from '../common/consts/consts';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private readonly logLevel: LogLevel;
  private readonly maxFileSize: number;
  private readonly logsDirectory: string;

  constructor(private readonly configService: ConfigService) {
    this.logLevel = configService.get('log').logLevel;
    this.maxFileSize = configService.get('log').maxFileSize;
    this.logsDirectory = '/usr/src/app/logs';
    this.createDir();
  }

  private createDir() {
    if (!existsSync(this.logsDirectory)) {
      mkdirSync(this.logsDirectory, { recursive: true });
    }
  }

  log(message: any, context?: string) {
    this.writeToFile(LogLevel.LOG, message, context);
  }

  error(message: any, context?: string) {
    this.writeToFile(LogLevel.ERROR, message, context);
  }

  warn(message: any, context?: string) {
    this.writeToFile(LogLevel.WARN, message, context);
  }

  debug(message: any, context?: string) {
    this.writeToFile(LogLevel.DEBUG, message, context);
  }

  logRequest(request: Request) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const logMessage = `${timestamp} [Request]: ${request.method} ${request.url}\n`;
    this.writeToFile(LogLevel.LOG, logMessage);
  }

  logResponse(request: Request, statusCode: number) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const startTime = request['startTime'];
    const endTime = new Date();

    const durationMs = endTime.getTime() - startTime.getTime();
    const logMessage = `${timestamp} [Response]: ${request.method} ${request.url} - Status: ${statusCode} - Duration: ${durationMs}ms\n`;

    this.writeToFile(LogLevel.LOG, logMessage);
  }

  private writeToFile(level: LogLevel, message: any, context?: string) {
    if (level <= this.logLevel) {
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const logMessage = `${timestamp} [${LogLevel[level]}]${context ? ` [${context}]` : ''}: ${message}\n`;
      const filename = `${LogLevel[level].toLowerCase()}-${timestamp}.log`;
      const filePath = join(this.logsDirectory, filename);

      stat(filePath, (err, stats) => {
        if (err && err.code === 'ENOENT') {
          this.writeToFileDirectly(filePath, logMessage);
        } else if (err) {
          console.error(`Error getting file stats: ${err}`);
        } else {
          if (
            stats.size + Buffer.byteLength(logMessage, 'utf8') >
            this.maxFileSize
          ) {
            this.rotateLogFile(filePath, logMessage);
          } else {
            this.writeToFileDirectly(filePath, logMessage);
          }
        }
      });
    }
  }

  private writeToFileDirectly(filePath: string, logMessage: string) {
    appendFile(filePath, logMessage, (err) => {
      if (err) {
        console.error(`Error writing to log file: ${err}`);
      }
    });
  }

  private rotateLogFile(filePath: string, logMessage: string) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const renamedFilePath = join(
      this.logsDirectory,
      `${basename(filePath, extname(filePath))}-${timestamp}${extname(filePath)}`,
    );

    rename(filePath, renamedFilePath, (err) => {
      if (err) {
        console.error('Error rotating log file:', err);
      } else {
        this.writeToFileDirectly(filePath, logMessage);
      }
    });
  }
}
