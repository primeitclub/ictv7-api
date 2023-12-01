import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (_req, file, callback) => {
      const originalName = file.originalname.split('.')[0].toLowerCase();
      const uniqueSuffix = uuidv4();
      const fileExtension = file.originalname.split('.').pop();
      const filename = `${originalName}-${uniqueSuffix}.${fileExtension}`;
      callback(null, filename);
    }
  })
};
