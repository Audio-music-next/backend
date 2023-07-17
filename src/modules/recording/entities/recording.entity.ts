export class Recording {
  readonly id: number;
  title: string;
  audio: Express.Multer.File;
  readonly date: string;
}
