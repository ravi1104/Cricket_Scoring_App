import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './schemas/match.schema';
import { Commentary, CommentarySchema } from './schemas/commentary.schema';
import { Counter, CounterSchema } from './schemas/counter.schema';
import { RedisService } from '../common/redis.service';
import { CommentaryGateway } from '../gateway/commentary.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: Commentary.name, schema: CommentarySchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [MatchesController],
  providers: [MatchesService, RedisService, CommentaryGateway],
  exports: [MatchesService],
})
export class MatchesModule {}
