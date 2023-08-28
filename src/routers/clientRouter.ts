import { ClientController } from '../controllers/clientController';
import { Router } from 'express';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.post('/', clientController.addFromHttp);

export default clientRouter;
