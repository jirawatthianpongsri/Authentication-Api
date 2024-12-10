import http from 'http';
import { Express } from 'express';

class server {
    private server:http.Server;
    constructor(private PORT:number,private app:Express,connectDatabase:()=>void) {
        this.server = http.createServer(app);
        this.listen();
        connectDatabase();
    }

    private listen = () => {
        this.server.listen(this.PORT,()=>{
            console.log(`Server is running on Port ${this.PORT}`);
        });
    }
}

export { server };
