import { Document, Types } from 'mongoose';
export type CommentaryDocument = Commentary & Document;
export declare class Commentary {
    matchId4: string;
    over: number;
    ball: number;
    type: string;
    runs?: number;
    text?: string;
}
export declare const CommentarySchema: import("mongoose").Schema<Commentary, import("mongoose").Model<Commentary, any, any, any, Document<unknown, any, Commentary> & Commentary & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Commentary, Document<unknown, {}, import("mongoose").FlatRecord<Commentary>> & import("mongoose").FlatRecord<Commentary> & {
    _id: Types.ObjectId;
}>;
