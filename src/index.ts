import express from 'express';
import fruitRouter from './routers/fruitRouter';
import bodyParser from 'body-parser';
import farmerRouter from './routers/farmerRouter';
import fieldRouter from './routers/fieldRouter';
import clientRouter from './routers/clientRouter';
import harvestRouter from './routers/harvestRouter';
import { db } from './db';

db.sync({ force: false }).then(() => {
  console.log('Database synced');
});
const app = express();

app.use(bodyParser.json());
app.use('/fruits', fruitRouter);
app.use('/farmers', farmerRouter);
app.use('/fields', fieldRouter);
app.use('/clients', clientRouter);
app.use('/harvests', harvestRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
