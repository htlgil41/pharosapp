import express, { Router, type Application } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { LoadEnvWithExceptions } from '../../../shareds/loadEnvWith.ts';

export class ExperssApp {
    
    private app: Application = express();
    private httpServer = http;

    constructor(){
        this.app.use(
            express.json(),
            express.urlencoded({ extended: true }),
            cors(),
            helmet(),
            compression()
        );
    }

    addRoutes(name: string, route: Router): this {

        this.app.use(`${name}`, route);
        return this;
    }

    serverUp(): void{

        const PORT = LoadEnvWithExceptions('PORT_APP');
        this.httpServer.createServer({
            connectionsCheckingInterval: 20000,
            keepAlive: true,
            requestTimeout: 8000
        }, this.app).listen(
            PORT,
            () =>{
                console.log(`Server run on ${PORT}`);
            }
        );
    }
}