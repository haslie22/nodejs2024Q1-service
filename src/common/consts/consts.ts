export enum PrismaClientErrorCode {
  UniqueConstraintViolation = 'P2002',
  RecordNotFound = 'P2025',
  ForeignKeyViolation = 'P2003',
  InvalidData = 'P2001',
}

export enum LogLevel {
  FATAL = 0,
  ERROR = 1,
  WARN = 2,
  LOG = 3,
  INFO = 4,
  VERBOSE = 5,
  DEBUG = 6,
}
