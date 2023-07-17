import { Injectable } from '@nestjs/common';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';
import { RecordingRepository } from './repository/recording.repository';

@Injectable()
export class RecordingService {
  constructor(private recordingRepository: RecordingRepository) {}

  create(createRecordingDto: CreateRecordingDto) {
    return this.recordingRepository.create(createRecordingDto);
  }

  findAll() {
    return this.recordingRepository.findAll();
  }

  findOne(recordingId: number) {
    return this.recordingRepository.findOne(recordingId);
  }

  update(id: number, updateRecordingDto: UpdateRecordingDto) {
    return `This action updates a #${id} recording`;
  }

  remove(id: number) {
    return `This action removes a #${id} recording`;
  }
}
