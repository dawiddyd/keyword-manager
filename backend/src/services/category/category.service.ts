import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { data } from '../../mock';
import { Category } from '../../category.model';
import fetch from 'node-fetch';

@Injectable()
export class CategoryService {
  data = data;

  getCategory(id: number): Category {
    const category = this.data.find(c => c.id === id);
    if (!category) {
      throw new NotFoundException(`Cannot find category with id: ${id}`);
    }
    return category;
  }

  async createCategory(name: string): Promise<Category> {
    // Creating new category with incremental id. Pre-filling with 10 keywords from server.
    const id = Math.max(0, ...this.data.map(c => c.id)) + 1;
    const newCategory = { id: id, name, keywords: [] };
    try {
      let res = await fetch(`https://api.datamuse.com/words?ml=${name}&max=10`);
      let words = await res.json();
      words.map(((w, i) => {
        newCategory.keywords.push({ id: i, name: w.word });
      }));
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    this.data.push(newCategory);
    return newCategory;
  }

  deleteCategory(id: number): Category {
    const category = this.data.find(c => c.id === id);
    if (!category) {
      throw new NotFoundException(`Cannot find category with id: ${id}`);
    }
    const index = this.data.indexOf(category);
    this.data.splice(index, 1);
    return category;
  }
}
