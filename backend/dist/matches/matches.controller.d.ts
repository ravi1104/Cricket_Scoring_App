import { MatchesService } from './matches.service';
import { StartMatchDto } from './dto/start-match.dto';
import { AddCommentaryDto } from './dto/add-commentary.dto';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    start(body: StartMatchDto): Promise<import("./schemas/match.schema").Match & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addCommentary(id: string, body: AddCommentaryDto): Promise<import("./schemas/commentary.schema").Commentary & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getMatch(id: string): Promise<{
        match: import("mongoose").FlattenMaps<import("./schemas/match.schema").MatchDocument> & {
            _id: import("mongoose").Types.ObjectId;
        };
        commentary: (import("mongoose").FlattenMaps<import("./schemas/commentary.schema").CommentaryDocument> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        last10: any[];
    }>;
    listOngoing(): Promise<(import("mongoose").FlattenMaps<import("./schemas/match.schema").MatchDocument> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    pause(id: string): Promise<import("mongoose").FlattenMaps<import("./schemas/match.schema").MatchDocument> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    resume(id: string): Promise<import("mongoose").FlattenMaps<import("./schemas/match.schema").MatchDocument> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
