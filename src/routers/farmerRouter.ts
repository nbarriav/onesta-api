import { FarmerController } from '../controllers/farmerController';
import { Router } from 'express';

const farmerRouter = Router();
const farmerController = new FarmerController();

farmerRouter.post('/', farmerController.addFromHttp);

export default farmerRouter;
