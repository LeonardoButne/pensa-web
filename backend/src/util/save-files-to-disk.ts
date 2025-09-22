import { writeFile, unlink } from 'fs/promises';
import { resolve, extname } from 'path';
import * as fs from 'fs';

const nr_aleatorio = (): number => Math.floor(Math.random() * 10000 + 10000);

export async function saveFilesToDisk(file: Express.Multer.File): Promise<string> {
  const uniqueName = `${Date.now()}_${nr_aleatorio()}${extname(file.originalname)}`;
  const folder = file.mimetype.startsWith('image/') ? 'img' : 'others';
  const uploadRoot = resolve(process.cwd(), 'uploads');
  const finalFolder = resolve(uploadRoot, folder);

  if (!fs.existsSync(finalFolder)) {
    fs.mkdirSync(finalFolder, { recursive: true });
  }

  const filePath = resolve(finalFolder, uniqueName);
  await writeFile(filePath, file.buffer);
  return uniqueName;
}

export async function removeFileFromDisk(fileName: string, folder: string = 'img') {
  const filePath = resolve(process.cwd(), 'uploads', folder, fileName);
  try {
    await unlink(filePath);
  } catch (e) {
    // Apenas loga, não lança erro
    console.error('Erro ao remover arquivo:', e);
  }
}
