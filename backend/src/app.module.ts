import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CategoryService } from './services/category/category.service';
import { KeywordService } from './services/keyword/keyword.service';
import { KeywordsResolver } from './keywords.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),],
  providers: [KeywordService, CategoryService, KeywordsResolver],
})
export class AppModule {}
