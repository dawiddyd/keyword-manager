import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Keyword } from './keyword.model';

@ObjectType()
export class Category {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => [Keyword])
  keywords: Keyword[];
}
