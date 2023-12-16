import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { EsportsService } from './esports.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor
} from '@nestjs/platform-express';
import { IsPublic } from 'src/utils/decorator';
import { TeamRegistrationDto } from './esports.dto';
@ApiTags('Esports')
@ApiBearerAuth()
@Controller('esports')
export class EsportsController {
  constructor(private readonly esportsService: EsportsService) {}

  @IsPublic()
  @Post('/valorant/register')
  @ApiConsumes('multipart/form-data')
  //   @UseInterceptors(
  //     // FileInterceptor('teamLogo'),
  //     // FileInterceptor('teamLeaderImage')
  //     // FileInterceptor('teamMemberOneImage'),
  //     // FileInterceptor('teamMemberTwoImage'),
  //     // FileInterceptor('teamMemberThreeImage'),
  //     // FileInterceptor('teamMemberFourImage')
  //     FileFieldsInterceptor([
  //       { name: 'teamLeaderImage', maxCount: 1 },
  //       { name: 'teamLogo', maxCount: 1 },
  //       { name: 'teamMemberOneImage', maxCount: 1 },
  //       { name: 'teamMemberTwoImage', maxCount: 1 },
  //       { name: 'teamMemberThreeImage', maxCount: 1 },
  //       { name: 'teamMemberFourImage', maxCount: 1 }
  //     ])
  //   )
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'teamLeaderImage', maxCount: 1 },
      { name: 'teamLogo', maxCount: 1 }
    ])
  )
  async registerValorant(
    @Req() req,
    @Body() body: any,
    // @UploadedFiles()
    // files: {
    //   teamLogo: Express.Multer.File;
    //   teamLeaderImage: Express.Multer.File;
    //   teamMemberOneImage: Express.Multer.File;
    //   teamMemberTwoImage: Express.Multer.File;
    //   teamMemberThreeImage: Express.Multer.File[];
    //   teamMemberFourImage: Express.Multer.File[];
    // }
    @UploadedFiles()
    files: {
      teamLeaderImage: Express.Multer.File[];
      teamLogo: Express.Multer.File[];
    }
    // @UploadedFiles()
    // files2: {
    //   teamLeaderImage: Express.Multer.File[];
    //   teamLogo: Express.Multer.File[];
    // }
  ) {
    console.log({ files });
    return await this.esportsService.registerValorant(body, req.user.id);
  }

  //   @IsPublic()
  //   @Post('/valorant/register')
  //   @ApiConsumes('multipart/form-data')
  //   @UseInterceptors(
  //     // FileInterceptor('teamLogo'),
  //     // FileInterceptor('teamLeaderImage')
  //     // FileInterceptor('teamMemberOneImage'),
  //     // FileInterceptor('teamMemberTwoImage'),
  //     // FileInterceptor('teamMemberThreeImage'),
  //     // FileInterceptor('teamMemberFourImage')
  //     FileFieldsInterceptor([
  //       { name: 'teamLeaderImage', maxCount: 1 },
  //       { name: 'teamLogo', maxCount: 1 },
  //       { name: 'teamMemberOneImage', maxCount: 1 },
  //       { name: 'teamMemberTwoImage', maxCount: 1 },
  //       { name: 'teamMemberThreeImage', maxCount: 1 },
  //       { name: 'teamMemberFourImage', maxCount: 1 }
  //     ])
  //   )
  //   //   @UseInterceptors(
  //   //     FileInterceptor('teamLogo'),
  //   //     FileInterceptor('teamLeaderImage')
  //   //   )
  //   async registerValorant(
  //     @Req() req,
  //     @Body() body: any,
  //     @UploadedFiles() teamLogo: Express.Multer.File,
  //     @UploadedFiles() teamLeaderImage: Express.Multer.File
  //   ) {
  //     console.log({ teamLogo, teamLeaderImage });
  //     return await this.esportsService.registerValorant(body, req.user.id);
  //   }

  @IsPublic()
  @Post('upload')
  @UseInterceptors(
    // FileInterceptor('teamLogo'),
    FileFieldsInterceptor([
      { name: 'teamLeaderImage', maxCount: 1 },
      { name: 'teamLogo', maxCount: 1 }
    ])
  )
  //   @UseInterceptors(FileInterceptor('teamLeaderImage'))
  uploadFile(
    @UploadedFiles() teamLogo: Express.Multer.File[]
    // @UploadedFiles() teamLeaderImage: Express.Multer.File[]
  ) {
    console.log({ teamLogo });
    return { teamLogo };
  }

  @IsPublic()
  @Post('uploads')
  @UseInterceptors(AnyFilesInterceptor())
  uploadsFile(
    @UploadedFiles() teamLogo: Array<Express.Multer.File>,
    @UploadedFiles() teamLeaderImage: Array<Express.Multer.File>
  ) {
    console.log({ teamLogo, teamLeaderImage });
    return { teamLogo, teamLeaderImage };
  }
}
