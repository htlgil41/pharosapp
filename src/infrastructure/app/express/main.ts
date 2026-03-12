import cluster from 'cluster';
import { ClusterModule } from "./config/cluster.ts";
import { ExperssApp } from './config/express.ts';
import { AuthRouter } from './routes/auth.ts';
import { FarmaciaRouter } from './routes/farmacia.ts';

export function InitAppExpress() {
    
    const clusterModule = new ClusterModule();
    if (cluster.isPrimary){

        clusterModule.init();
    }else{

        const appExpress = new ExperssApp();
        appExpress
            .addRoutes('auth', AuthRouter)
            .addRoutes('farmacia', FarmaciaRouter)
            .serverUp();
    }
}