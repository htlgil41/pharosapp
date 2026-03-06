import cluster from 'cluster'
import os from 'os';

export class ClusterModule {

    init() {

        for (let cpus of os.cpus()){

            cluster.fork();
            console.log(`${cpus.model} ON`);
        }

        cluster.on('exit', (c) => this.off(c.id));
    }

    private off(id: number){
        cluster.fork();
        console.log(`cluser up ${id}`);
    }
}