import { BadRequestException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { createReadStream } from 'fs';

@Injectable()
export class FileService {
  async create(file, folderName) {
    try {
      const filePath = path.resolve(__dirname, '../..', `static/${folderName}`);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, file.originalname), file.buffer);
      return file.originalname;
    } catch (error) {
      throw new BadRequestException('Disk error');
    }
  }

  async upload(avatar, id, filePath: string) {
    const fileExtension = avatar?.originalname.split('.').pop();
    const avatarName = String(id);
    avatar.originalname = avatarName + '.' + fileExtension;
    const pathName = path.resolve(__dirname, '../..', `static/${filePath}`);

    if (fs.existsSync(pathName)) {
      const returnedFile = fs.readdirSync(pathName).find((file) => file.split('')[0] == avatarName);
      if (returnedFile) {
        if (returnedFile.split('.').pop() !== fileExtension)
          fs.unlink(path.resolve(__dirname, '../..', `static/${filePath}/${returnedFile}`), (err) =>
            console.log('error', err),
          );
      }
    }
    try {
      await this.create(avatar, filePath);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  async download(id, res, filePath) {
    const fileName = id;
    const folderPath = path.resolve(__dirname, '../..', `static/${filePath}`);
    let returnedFile: string;

    returnedFile = fs.readdirSync(folderPath).find((file) => file.split('')[0] == fileName);

    if (!returnedFile) returnedFile = 'default.jpg';

    res.set({
      'Content-Type': returnedFile.includes('png') ? 'image/png' : 'image/jpeg',
      'Cache-control': 'public, max-age=86400',
    });
    const file = path.join(path.resolve(__dirname, '../..', `static/${filePath}/${returnedFile}`));
    const readStream = createReadStream(file);
    return new StreamableFile(readStream);
  }
}
