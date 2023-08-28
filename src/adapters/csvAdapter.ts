import { ReadStream } from 'fs';
import csvParser from 'csv-parser';
import { CSVHarvestRow, HarvestRow } from '../types';

export class CSVAdapter {
  static async getRowsCSV(readableStream: ReadStream): Promise<HarvestRow[]> {
    return new Promise((resolve, reject) => {
      const results: HarvestRow[] = [];

      readableStream
        .pipe(csvParser({ separator: ';' }))
        .on('data', (data: CSVHarvestRow) =>
          results.push(this.processRow(data))
        )
        .on('end', () => {
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  private static processRow(row: CSVHarvestRow): HarvestRow {
    return {
      fruit: {
        name: row['Fruta Cosechada'],
        variety: row['Variedad Cosechada'],
      },
      field: {
        name: row['Nombre Campo'],
        location: row['Ubicación de Campo'],
      },
      client: {
        email: row['Mail Cliente'],
        name: row['Nombre Cliente'],
        lastName: row['Apellido Cliente'],
      },
      farmer: {
        email: row['Mail Agricultor'],
        name: row['Nombre Agricultor'],
        lastName: row['Apellido Agricultor'],
      },
    };
  }
}
