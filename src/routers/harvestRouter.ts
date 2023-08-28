import { HarvestController } from '../controllers/harvestController';
import { Router } from 'express';
import multer from 'multer';

const harvestRouter = Router();
const harvestController = new HarvestController();

const upload = multer({ dest: 'uploads/' });

harvestRouter.post(
  '/',
  upload.single('csvFile'),
  harvestController.addHarvests
);
export default harvestRouter;
