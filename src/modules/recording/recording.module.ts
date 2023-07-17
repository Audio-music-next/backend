import { Module } from '@nestjs/common';
import { RecordingService } from './recording.service';
import { RecordingController } from './recording.controller';
import { RecordingRepository } from './repository/recording.repository';
import { RecordingPrismaRepository } from './repository/prisma/recording.prisma';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [RecordingController],
  providers: [
    RecordingService,
    PrismaService,
    { provide: RecordingRepository, useClass: RecordingPrismaRepository },
  ],
})
export class RecordingModule {}
