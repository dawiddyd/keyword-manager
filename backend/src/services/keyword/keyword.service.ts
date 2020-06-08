import { Injectable, NotFoundException } from '@nestjs/common';
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

  deleteKeyword(categoryId: number, keywordId: number): number {
    const category = this.data.find(c => c.id === categoryId);
    if (!category) {
      throw new NotFoundException(`Cannot find category with id: ${categoryId}`);
    }
    const keyword = category.keywords.find(k => k.id === keywordId);
    if (!keyword) {
      throw new NotFoundException(`Cannot find keyword with id: ${keywordId}`);
    }
    const keywordIndex = category.keywords.indexOf(keyword);
    category.keywords.splice(keywordIndex, 1);
    const categoryIndex = this.data.indexOf(category);
    this.data[categoryIndex] = category;
    return keywordId;
  }
}
