import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import errorHandler from '../middlewares/error-handler';
import routes from '../routes';
import { API_ROUTE_PREFIX, COOKIE_SECRET, APP_CLIENT_ORIGIN, CLOG_COLORS } from '../consts';

class AppServer {
    app: Application;
    port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
    }

    protected _initRouteHandlers() {
        this.app.use(express.json());
        this.app.use(cookieParser(COOKIE_SECRET));
        this.app.use(helmet());
        this.app.use(
            cors({
                origin: APP_CLIENT_ORIGIN,
                credentials: true,
            })
        );

        this.app.get('/', (req: Request, res: Response) => {
            const response = {
                message: 'ZSDIS Admin Server running',
            };
            res.json(response);
        });

        routes.forEach((route) => {
            this.app.use(`${API_ROUTE_PREFIX}${route.prefix}`, route.route);
        });

        this.app.use(errorHandler);
    }

    init() {
        this._initRouteHandlers();
        this.app.listen(this.port, () =>
            console.log(CLOG_COLORS.bright + `Server running on port ${this.port}` + CLOG_COLORS.reset)
        );
    }
}

export const createServer = (port: number) => {
    return new AppServer(port);
};
