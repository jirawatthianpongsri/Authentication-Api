import authenticationRoutes from './routes/authentication';
import userRoute from './routes/user';
import { errorHandler } from './middlewares/error';
import { authenticate } from './middlewares/auth';
import app from '../class/app/app';

const App = new app({Routes:authenticationRoutes,Middleware:authenticate},{Routes:userRoute},{Middleware:errorHandler});

export default App.express;
