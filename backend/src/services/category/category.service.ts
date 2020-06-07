import { Injectable } from '@nestjs/common';
import { data } from '../../mock';
import { Category } from '../../category.model';

@Injectable()
export class CategoryService {
  data = data;

  getCategory(id: number): Category {
    return this.data.find(c => c.id === id);
  }

  createCategory(name: string): Category {
    const id = this.data.length + 1;
    const newCategory = { id: id, name, keywords: [] };
    this.data.push(newCategory);
    return newCategory;
  }

  deleteCategory(id: number): boolean {
    const category = this.data.find(c => c.id === id);
    const index = this.data.indexOf(category);
    this.data.splice(index, 1);
    return true;
  }
}
