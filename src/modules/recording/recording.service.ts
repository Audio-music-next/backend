import { Injectable } from '@nestjs/common';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';
import { RecordingRepository } from './repository/recording.repository';
import { v2 as cloudinary } from 'cloudinary';
@Injectable()
export class RecordingService {
  constructor(private recordingRepository: RecordingRepository) {}

  async create(recording: CreateRecordingDto, audio: Express.Multer.File) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const uploadAudio = await cloudinary.uploader.upload(
      recording.audio.path,
      { resource_type: 'video' },
      (error, result) => {
        console.log(error);
        return result;
      },
    );

    const createRecording = await this.recordingRepository.create({
      audio: audio.secure_url,
      title: recording.title,
    });

    return this.recordingRepository.create(createRecording);
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
