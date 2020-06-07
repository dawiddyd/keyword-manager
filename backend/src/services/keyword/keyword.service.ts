import { Injectable } from '@nestjs/common';
import { data } from '../../mock';
import { Keyword } from '../../keyword.model';

@Injectable()
export class KeywordService {
  data = data;

  getData() {
    return this.data;
  }

  getKeywordsByCategoryId(id: number): Keyword[] {
    return this.data.find(c => c.id === id).keywords;
  }

  createKeyword(categoryId: number, name: string): Keyword[] {
    const category = this.data.find(c => c.id === categoryId);
    const newId = category.keywords.length + 1;
    const newKeyword = { id: newId, name };
    category.keywords.push(newKeyword);
    let index = this.data.indexOf(category);
    this.data[index] = category;
    return this.data.find(c => c.id === categoryId).keywords;
  }

  deleteKeyword(categoryId: number, keywordId: number): boolean {
    const category = this.data.find(c => c.id === categoryId);
    const newCategoryKeywords: Keyword[] = category.keywords.filter(k => k.id !== keywordId);
    category.keywords = newCategoryKeywords;
    this.data = this.data.filter(c => c.id !== categoryId);
    this.data.push(category);
    return true;
  }
}
