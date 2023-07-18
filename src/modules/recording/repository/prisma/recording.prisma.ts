import { PrismaService } from 'src/database/prisma.service';
import { CreateRecordingDto } from '../../dto/create-recording.dto';
import { Recording } from '../../entities/recording.entity';
import { RecordingRepository } from '../recording.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecordingPrismaRepository implements RecordingRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRecordingDto): Promise<Recording> {
    const newRecording = new Recording();
    Object.assign(newRecording, {
      ...data,
    });

    const createRecording = await this.prisma.recording.create({
      data: { ...newRecording },
    });

    return createRecording;
  }

  async findAll(): Promise<Recording[]> {
    return;
  }
  async findOne(): Promise<Recording> {
    return;
  }
}
