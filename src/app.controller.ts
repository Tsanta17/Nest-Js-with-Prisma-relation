import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // utilisation de Batch/Bulk transaction qui permet de récupérer tous les datas en même temps
  @Get('sequential')
  getSequentialResults() {
    return this.prisma.$transaction([
      this.prisma.post.findMany(),
      this.prisma.artist.findMany(),
      this.prisma.song.findMany(),
    ]);
  }
}
