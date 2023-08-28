import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { CSVAdapter } from '../adapters/csvAdapter';
import { CSVHarvestRepository } from '../repositories/CSVHarvestRepository';
import { ImportHarvestsUseCase } from '../useCases/Harvest/importHarvests';

export class HarvestController {
  async addHarvests(req: Request, res: Response) {
    if (!req.file) {
      res.status(400).send({ error: 'Missing CSV file' });
      return;
    }
    const readableStream = createReadStream(req.file.path);
    try {
      const rows = await CSVAdapter.getRowsCSV(readableStream);
      const repository = new CSVHarvestRepository();
      const addUseCase = new ImportHarvestsUseCase(repository);
      const newHarvests = await addUseCase.execute(rows);
      res.send({ harvests: newHarvests });
    } catch (error) {
      res.status(400).send({ error });
    }
  }
}
