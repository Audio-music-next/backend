import { BadRequestException, Module } from '@nestjs/common';
import { RecordingService } from './recording.service';
import { RecordingController } from './recording.controller';
import { RecordingRepository } from './repository/recording.repository';
import { RecordingPrismaRepository } from './repository/prisma/recording.prisma';
import { PrismaService } from 'src/database/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './tmp',
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (file.mimetype === 'audio/mpeg') {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only mp3 format allowed'), false);
        }
      },
    }),
  ],
  controllers: [RecordingController],
  providers: [
    RecordingService,
    PrismaService,
    { provide: RecordingRepository, useClass: RecordingPrismaRepository },
  ],
})
export class RecordingModule {}
