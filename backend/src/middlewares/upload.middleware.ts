import { NextFunction, Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';

// Configuração do Multer para um único arquivo
export default {
  storage: multer.memoryStorage(),
  limits: {
    files: 1, // Apenas 1 arquivo
    fileSize: 5 * 1024 * 1024, // 5MB por arquivo
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const allowedImageTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'image/gif',
      'image/bmp',
      'image/svg+xml',
      'image/tiff',
    ];

    if (!allowedImageTypes.includes(file.mimetype)) {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Apenas imagens são permitidas.'));
    }

    cb(null, true);
  },
};

// Middleware para processar uma única imagem com Sharp
export const processImage = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.file) {
    return next();
  }

  if (req.file.mimetype.startsWith('image/')) {
    sharp(req.file.buffer)
      .resize({
        width: 1920,
        height: 1080,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .jpeg({ quality: 80, mozjpeg: true }) // Escolhe apenas um formato de saída
      .toBuffer()
      .then((optimizedImage) => {
        req.file!.buffer = optimizedImage;
        req.file!.size = optimizedImage.length;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next();
  }
};
