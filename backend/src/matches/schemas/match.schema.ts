import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema({ timestamps: true })
export class Match {
  @Prop({ required: true, unique: true })
  matchId4!: string;

  @Prop({ required: true })
  teamA!: string;

  @Prop({ required: true })
  teamB!: string;

  @Prop({ default: 'ONGOING' })
  status!: 'ONGOING' | 'PAUSED' | 'COMPLETED';

  @Prop({ type: Object, required: false })
  meta?: Record<string, any>;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
