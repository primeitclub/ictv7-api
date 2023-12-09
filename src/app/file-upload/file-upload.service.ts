import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FileUploadService {
  constructor() {
    cloudinary.config({
      cloud_name: 'YOUR_CLOUD_NAME',
      api_key: 'YOUR_API_KEY',
      api_secret: 'YOUR_API_SECRET'
    });
  }

  //   upload(file: Express.Multer.File): Promise<cloudinary.UploadApiResponse> {
  //     return new Promise((resolve, reject) => {
  //       cloudinary.uploader
  //         .upload_stream(
  //           { folder: 'uploads' }, // optional: specify a folder in your Cloudinary account
  //           (error, result) => {
  //             if (error) {
  //               reject(error);
  //             } else {
  //               resolve(result);
  //             }
  //           }
  //         )
  //         .end(file.buffer);
  //     });
  //   }
}
