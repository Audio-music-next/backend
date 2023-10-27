import { PrismaService } from 'src/database/prisma.service';
import { CreateRecordingDto } from '../../dto/create-recording.dto';
import { Recording } from '../../entities/recording.entity';
import { RecordingRepository } from '../recording.repository';
import { Injectable } from '@nestjs/common';
import { UpdateRecordingDto } from '../../dto/update-recording.dto';

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
    const recording = await this.prisma.recording.findMany();

    return recording;
  }
  async findOne(recordingId: number): Promise<Recording> {
    const recording = await this.prisma.recording.findFirst({
      where: { id: recordingId },
    });

    return recording;
  }

  async update(
    data: UpdateRecordingDto,
    recordingId: number,
  ): Promise<Recording> {
    const newRecording = await this.prisma.recording.update({
      where: { id: recordingId },
      data: { ...data },
    });

    return newRecording;
  }

  async delete(recordingId: number): Promise<void> {
    await this.prisma.recording.delete({ where: { id: recordingId } });
  }
}
