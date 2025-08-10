import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesModule } from './matches/matches.module';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './common/redis.service';
import { CommentaryGateway } from './gateway/commentary.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/cricketdb'),
    MatchesModule,
  ],
  providers: [RedisService, CommentaryGateway],
})
export class AppModule {}
