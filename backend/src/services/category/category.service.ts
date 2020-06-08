import { Injectable, NotFoundException } from '@nestjs/common';
import { data } from '../../mock';
import { Category } from '../../category.model';

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

  createCategory(name: string): Category {
    const id = Math.max(0, ...this.data.map(c => c.id)) + 1;
    const newCategory = { id: id, name, keywords: [] };
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
