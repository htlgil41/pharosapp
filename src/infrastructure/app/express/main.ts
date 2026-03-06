import cluster from 'cluster';
import { ClusterModule } from "./config/cluster.ts";
import { ExperssApp } from './config/express.ts';

export function InitAppExpress() {
    
    const clusterModule = new ClusterModule();
    if (cluster.isPrimary){

        clusterModule.init();
    }else{

        const appExpress = new ExperssApp();
        appExpress.initConfExpress();
        appExpress.serverUp();
    }
}