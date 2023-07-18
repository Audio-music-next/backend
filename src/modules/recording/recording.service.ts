import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';
import { RecordingRepository } from './repository/recording.repository';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'node:fs';
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
      audio.path,
      { resource_type: 'video' },
      (error, result) => {
        return result;
      },
    );

    const createRecording = await this.recordingRepository.create({
      audio: uploadAudio.secure_url,
      title: recording.title,
    });

    unlink(audio.path, (error) => {
      if (error) console.log(error);
    });

    return createRecording;
  }

  findAll() {
    return this.recordingRepository.findAll();
  }

  async findOne(recordingId: number) {
    const findRecording = await this.recordingRepository.findOne(recordingId);

    if (!findRecording) {
      throw new NotFoundException('The recording not found');
    }

    return findRecording;
  }

  async update(
    updateRecording: UpdateRecordingDto,
    audio: Express.Multer.File,
    recordingId: number,
  ) {
    const findRecording = await this.recordingRepository.findOne(recordingId);

    if (!findRecording) {
      throw new NotFoundException('The recording not found');
    }

    if (audio) {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const uploadAudio = await cloudinary.uploader.upload(
        audio.path,
        { resource_type: 'video' },
        (error, result) => {
          return result;
        },
      );

      const newRecording = await this.recordingRepository.create({
        audio: uploadAudio.secure_url,
        title: updateRecording.title,
      });

      unlink(audio.path, (error) => {
        if (error) console.log(error);
      });
      return await this.recordingRepository.update(newRecording, recordingId);
    }

    return await this.recordingRepository.update(updateRecording, recordingId);
  }

  async remove(recordingId: number) {
    const findRecording = await this.recordingRepository.findOne(recordingId);

    if (!findRecording) {
      throw new NotFoundException('The recording not found');
    }

    return await this.recordingRepository.delete(recordingId);
  }
}
