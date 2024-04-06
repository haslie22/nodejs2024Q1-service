import { join } from 'path';
import { existsSync, mkdirSync, Stats } from 'fs';
import { stat, appendFile } from 'fs/promises';
import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { LogLevel } from '../common/consts/consts';

@Injectable()
export class CustomLoggerService implements LoggerService {
  filenamesCounter = {
    [LogLevel.FATAL]: 0,
    [LogLevel.ERROR]: 0,
    [LogLevel.WARN]: 0,
    [LogLevel.LOG]: 0,
    [LogLevel.VERBOSE]: 0,
    [LogLevel.DEBUG]: 0,
  };

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

  fatal(message: any, context?: string) {
    this.writeToFile(LogLevel.FATAL, message, context);
  }

  error(message: any, context?: string) {
    this.writeToFile(LogLevel.ERROR, message, context);
  }

  warn(message: any, context?: string) {
    this.writeToFile(LogLevel.WARN, message, context);
  }

  log(message: any, context?: string) {
    this.writeToFile(LogLevel.LOG, message, context);
  }

  verbose(message: any, context?: string) {
    this.writeToFile(LogLevel.VERBOSE, message, context);
  }

  debug(message: any, context?: string) {
    this.writeToFile(LogLevel.DEBUG, message, context);
  }

  logRequest(request: Request) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const logMessage = `${timestamp} [Request]: ${request.method} ${request.url} - Query: ${JSON.stringify(request.query)} - Body: ${JSON.stringify(request.body)}\n`;

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

  private async writeToFile(level: LogLevel, message: any, context?: string) {
    if (level > this.logLevel) return;

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const logMessage = `${timestamp} [${LogLevel[level]}]${context ? ` [${context}]` : ''}: ${message}\n`;

    const fileName = this.generateFileName(level);
    const filePath = join(this.logsDirectory, fileName);

    try {
      let stats: Stats | undefined;
      try {
        stats = await stat(filePath);
      } catch (err) {
        if (err.code !== 'ENOENT') throw err;
      }

      if (
        stats &&
        stats.size + Buffer.byteLength(logMessage, 'utf8') > this.maxFileSize
      ) {
        this.filenamesCounter[level] += 1;

        const newFileName = this.generateFileName(level);
        const newFilePath = join(this.logsDirectory, newFileName);

        await this.writeToFileDirectly(newFilePath, logMessage);
      } else {
        await this.writeToFileDirectly(filePath, logMessage);
      }
    } catch (err) {
      console.error(`Error writing to log file: ${err}`);
    }
  }

  private generateFileName(level: LogLevel): string {
    return `${LogLevel[level].toLowerCase()}-${this.filenamesCounter[level]}.log`;
  }

  private async writeToFileDirectly(filePath: string, logMessage: string) {
    try {
      await appendFile(filePath, logMessage);
    } catch (err) {
      console.error(`Error writing to log file: ${err}`);
    }
  }
}
