import { FieldController } from '../controllers/fieldController';
import { Router } from 'express';

const fieldRouter = Router();
const fieldController = new FieldController();

fieldRouter.post('/', fieldController.addFromHttp);

export default fieldRouter;
