import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Bind,
} from '@nestjs/common';
import { RecordingService } from './recording.service';
import { CreateRecordingDto } from './dto/create-recording.dto';
import { UpdateRecordingDto } from './dto/update-recording.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('recording')
export class RecordingController {
  constructor(private readonly recordingService: RecordingService) {}

  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  @Bind(UploadedFile())
  create(
    @UploadedFile() audio: Express.Multer.File,
    @Body() createRecordingDto: CreateRecordingDto,
  ) {
    return this.recordingService.create(createRecordingDto, audio);
  }

  @Get()
  findAll() {
    return this.recordingService.findAll();
  }

  @Get(':recordingId')
  findOne(@Param('recordingId') id: string) {
    const recordingId = parseInt(id);
    return this.recordingService.findOne(recordingId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecordingDto: UpdateRecordingDto,
  ) {
    return this.recordingService.update(+id, updateRecordingDto);
  }

  @Delete(':recordingId')
  remove(@Param('recordingId') id: string) {
    const recordingId = parseInt(id);
    return this.recordingService.remove(recordingId);
  }
}
