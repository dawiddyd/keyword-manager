import { Injectable } from '@nestjs/common';
import { data } from '../../mock';
import { Category } from '../../category.model';
import { Keyword } from '../../keyword.model';

@Injectable()
export class CategoryService {
  data = data;

  getCategory(id: number): Category {
    return this.data.find(c => c.id == id);
  }

  createCategory(name: string): Category {
    const id = this.data.length;
    const newCategory = { id: id, name, keywords: [] };
    this.data.push(newCategory);
    return this.data.find(c => c.name == name);
  }

  deleteCategory(id: number): boolean {
    this.data = this.data.filter(c => c.id != id);
    return true;
  }
}
