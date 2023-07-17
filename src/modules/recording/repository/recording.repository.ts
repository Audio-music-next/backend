import { CreateRecordingDto } from '../dto/create-recording.dto';
import { Recording } from '../entities/recording.entity';

export abstract class RecordingRepository {
  abstract create(
    createRecordingDto: CreateRecordingDto,
  ): Promise<Recording> | Recording;
  abstract findOne(recordingId: number): Promise<Recording> | Recording;
  abstract findAll(): Promise<Recording[]> | Recording[];
}
