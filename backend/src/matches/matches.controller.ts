import { Controller, Post, Body, Param, Get, ParseIntPipe, Query, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { StartMatchDto } from './dto/start-match.dto';
import { AddCommentaryDto } from './dto/add-commentary.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post('start')
  @UsePipes(new ValidationPipe({ transform: true }))
  async start(@Body() body: StartMatchDto) {
    const { teamA, teamB, meta } = body;
    const match = await this.matchesService.startMatch(teamA, teamB, meta);
    return match;
  }

  @Post(':id/commentary')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addCommentary(@Param('id') id: string, @Body() body: AddCommentaryDto) {
    const created = await this.matchesService.addCommentary(id, body as any);
    return created;
  }

  @Get(':id')
  async getMatch(@Param('id') id: string) {
    return await this.matchesService.getMatchWithCommentary(id);
  }

  @Get('')
  async listOngoing() {
    return await this.matchesService.listOngoingMatches();
  }

  // bonus: pause/resume endpoints
  @Patch(':id/pause')
  async pause(@Param('id') id: string) {
    return await this.matchesService.pauseMatch(id);
  }

  @Patch(':id/resume')
  async resume(@Param('id') id: string) {
    return await this.matchesService.resumeMatch(id);
  }
}
