import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig: MulterModuleOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const uniqueSuffix = uuidv4();
      const fileExtension = file.originalname.split('.').pop();
      const filename = `${uniqueSuffix}.${fileExtension}`;
      callback(null, filename);
    }
  })
};
