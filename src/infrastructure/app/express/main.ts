import cluster from 'cluster';
import { ClusterModule } from "./config/cluster.ts";
import { ExperssApp } from './config/express.ts';
import { AuthRouter } from './routes/auth.ts';

export function InitAppExpress() {
    
    const clusterModule = new ClusterModule();
    if (cluster.isPrimary){

        clusterModule.init();
    }else{

        const appExpress = new ExperssApp();
        appExpress
            .addRoutes('auth', AuthRouter)
            .serverUp();
    }
}