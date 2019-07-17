import winston from 'winston';
import expressWinston from 'express-winston';

export default expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
          filename: 'errors.log'
      })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  })