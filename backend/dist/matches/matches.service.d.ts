import { Model } from 'mongoose';
import { Match, MatchDocument } from './schemas/match.schema';
import { Commentary, CommentaryDocument } from './schemas/commentary.schema';
import { CounterDocument } from './schemas/counter.schema';
import { RedisService } from '../common/redis.service';
export declare class MatchesService {
    private matchModel;
    private commentaryModel;
    private counterModel;
    private redisService;
    constructor(matchModel: Model<MatchDocument>, commentaryModel: Model<CommentaryDocument>, counterModel: Model<CounterDocument>, redisService: RedisService);
    getNextMatchId4(): Promise<string>;
    startMatch(teamA: string, teamB: string, meta?: any): Promise<Match & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addCommentary(matchId4: string, payload: Partial<Commentary>): Promise<Commentary & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getMatchWithCommentary(matchId4: string): Promise<{
        match: import("mongoose").FlattenMaps<MatchDocument> & {
            _id: import("mongoose").Types.ObjectId;
        };
        commentary: (import("mongoose").FlattenMaps<CommentaryDocument> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        last10: any[];
    }>;
    listOngoingMatches(): Promise<(import("mongoose").FlattenMaps<MatchDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    pauseMatch(matchId4: string): Promise<import("mongoose").FlattenMaps<MatchDocument> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    resumeMatch(matchId4: string): Promise<import("mongoose").FlattenMaps<MatchDocument> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
