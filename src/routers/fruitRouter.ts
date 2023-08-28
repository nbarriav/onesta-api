import { FruitController } from '../controllers/fruitController';
import { Router } from 'express';

const fruitRouter = Router();
const fruitController = new FruitController();

fruitRouter.post('/', fruitController.addFromHttp);
export default fruitRouter;
