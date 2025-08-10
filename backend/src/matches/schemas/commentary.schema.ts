import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentaryDocument = Commentary & Document;

@Schema({ timestamps: true })
export class Commentary {
  @Prop({ required: true })
  matchId4!: string;

  @Prop({ required: true })
  over!: number;

  @Prop({ required: true })
  ball!: number;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  runs!: number;

  @Prop({ required: true })
  text!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
}

export const CommentarySchema = SchemaFactory.createForClass(Commentary);
