import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express , { Express , Router , Request , Response, response, NextFunction } from 'express';
import helmet from 'helmet';
class app {
    public express:Express = express();
    constructor(
        private auth:{Routes:Router,Middleware:express.RequestHandler},
        private user:{Routes:Router},
        private error:{Middleware:(err:Error,res:Response)=>unknown}
    ) {
        this.onStart();
    };

    private onStart =  async () => {
        //Setting
        this.express.use(cookieParser());
        this.express.use(helmet());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended:true}));
        //Use routes
        this.routes();
    };

    private routes = () => {
        this.express.get('/',(req:Request,res:Response)=>{
            res.send("APP : OKAY");
        });
        //Auth routes
        this.express.use('/auth',this.auth.Routes);
        //User routes
        this.express.use('/user', this.auth.Middleware,this.user.Routes);
        this.express.use((err:Error,req:Request,res:Response,next:NextFunction)=>{this.error.Middleware(err,res)});
    }
}

export default app;