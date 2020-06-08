import {Keyword} from "./keyword.model";

export interface Category {
    id: number;
    name: string;
    keywords: Keyword[];
}
