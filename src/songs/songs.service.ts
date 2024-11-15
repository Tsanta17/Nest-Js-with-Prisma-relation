import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  create(createSongDto: Prisma.SongUncheckedCreateInput) {
    return this.prisma.song.create({
      data: createSongDto,
    });
  }

  findAll() {
    return this.prisma.song.findMany({include: { artist: true }});
  }

  findOne(songWhereUniqueInput: Prisma.SongWhereUniqueInput) {
    return this.prisma.song.findUnique({ where: songWhereUniqueInput });
  }

  update(
    where: Prisma.SongWhereUniqueInput, //clé unique déjà défini par prisma avec son type
    updateSongDto: Prisma.SongUpdateInput,
  ) {
    return this.prisma.song.update({
      where,
      data: updateSongDto,
    });
  }

  remove(where: Prisma.SongWhereUniqueInput) {
    return this.prisma.song.delete({ where });
  }
}
