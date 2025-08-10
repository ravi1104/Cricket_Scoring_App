import { Document } from 'mongoose';
export type MatchDocument = Match & Document;
export declare class Match {
    matchId4: string;
    teamA: string;
    teamB: string;
    status: 'ONGOING' | 'PAUSED' | 'COMPLETED';
    meta?: any;
}
export declare const MatchSchema: import("mongoose").Schema<Match, import("mongoose").Model<Match, any, any, any, Document<unknown, any, Match> & Match & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Match, Document<unknown, {}, import("mongoose").FlatRecord<Match>> & import("mongoose").FlatRecord<Match> & {
    _id: import("mongoose").Types.ObjectId;
}>;
