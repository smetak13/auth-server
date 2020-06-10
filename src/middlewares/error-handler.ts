import { Request, Response, NextFunction } from 'express';
import { CLOG_COLORS } from '../consts';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(CLOG_COLORS.fgRed + error.toString() + CLOG_COLORS.reset);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);

    res.json({
        error: error.toString().replace(/^Error: /i, ''),
        meta: {
            statusCode,
            timestamp: new Date(),
        },
    });
};

export default errorHandler;
