import express, { type Application } from 'express';
import http from 'http';
import { LoadEnvWithExceptions } from '../../../shareds/loadEnvWithExceptions.ts';

export class ExperssApp {
    
    private app: Application = express();
    private httpServer = http;

    constructor(){}

    initConfExpress(): void{
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // Middlewaress
    }
    
    addRoutes(): this {
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