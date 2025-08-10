import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from './schemas/match.schema';
import { Commentary, CommentaryDocument } from './schemas/commentary.schema';
import { Counter, CounterDocument } from './schemas/counter.schema';
import { pad4 } from '../util/pad';
import { RedisService } from '../common/redis.service';
import { REDIS_CHANNEL, REDIS_LAST_10_PREFIX } from '../common/constants';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    @InjectModel(Commentary.name) private commentaryModel: Model<CommentaryDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
    private redisService: RedisService,
  ) {}

  // Reusable counter generator
  async getNextMatchId4(): Promise<string> {
    const key = 'match_id';
    const res = await this.counterModel.findOneAndUpdate(
      { key },
      { $inc: { seq: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).exec();

    const seq = res.seq;
    return pad4(seq);
  }

  async startMatch(teamA: string, teamB: string, meta?: any) {
    const matchId4 = await this.getNextMatchId4();
    const created = new this.matchModel({ matchId4, teamA, teamB, meta, status: 'ONGOING' });
    await created.save();
    return created.toObject();
  }

  async addCommentary(matchId4: string, payload: Partial<Commentary>) {
    const match = await this.matchModel.findOne({ matchId4 }).exec();
    if (!match) throw new NotFoundException('Match not found');

    if (match.status === 'PAUSED') {
      throw new BadRequestException('Match is paused');
    }

    const c = new this.commentaryModel({ ...payload, matchId4 });
    await c.save();

    // Push to Redis list (last 10) and publish
    const key = `${REDIS_LAST_10_PREFIX}${matchId4}`;
    const serialized = JSON.stringify({
      _id: c._id,
      matchId4,
      over: c.over,
      ball: c.ball,
      type: c.type,
      runs: c.runs,
      text: c.text,
      createdAt: c.createdAt,
    });
    await this.redisService.lpushAndTrim(key, serialized, 10);
    await this.redisService.publish(REDIS_CHANNEL, serialized);

    return c.toObject();
  }

  async getMatchWithCommentary(matchId4: string) {
    const match = await this.matchModel.findOne({ matchId4 }).lean().exec();
    if (!match) throw new NotFoundException('Match not found');

    const commentary = await this.commentaryModel.find({ matchId4 }).sort({ createdAt: 1 }).lean().exec();

    // get last 10 from redis for quick access (optional)
    const key = `${REDIS_LAST_10_PREFIX}${matchId4}`;
    const last10 = await this.redisService.lrange(key, 0, -1).catch(()=>[]);

    return { match, commentary, last10: last10.map((s) => JSON.parse(s)) };
  }

  async listOngoingMatches() {
    return await this.matchModel.find({ status: { $in: ['ONGOING','PAUSED'] } }).lean().exec();
  }

  async pauseMatch(matchId4: string) {
    const m = await this.matchModel.findOneAndUpdate({ matchId4 }, { status: 'PAUSED' }, { new: true }).lean().exec();
    if (!m) throw new NotFoundException('Match not found');
    return m;
  }

  async resumeMatch(matchId4: string) {
    const m = await this.matchModel.findOneAndUpdate({ matchId4 }, { status: 'ONGOING' }, { new: true }).lean().exec();
    if (!m) throw new NotFoundException('Match not found');
    return m;
  }
}
