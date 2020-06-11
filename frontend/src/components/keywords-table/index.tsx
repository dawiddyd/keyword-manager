import React, {useState} from 'react';
import {Category} from "../../models/category.model";
import {Keyword as KeywordModel} from "../../models/keyword.model";
import {Keyword} from "../keyword";
import {useMutation} from "@apollo/client";
import {CREATE_KEYWORD, DELETE_CATEGORY, GET_CATEGORIES} from "../../queries";

interface OwnProps {
    data: Category[];
}

const _KeywordsTable = (props: OwnProps) => {
    const [categoryId, setCategoryId] = useState();
    const [createKeyword] = useMutation(CREATE_KEYWORD, {
        update(cache, {data: {createKeyword}}) {
            const categories = cache.readQuery<{ categories: Category[] }>({query: GET_CATEGORIES})!.categories;
            cache.writeQuery({
                query: GET_CATEGORIES,
                data: {categories: categories.concat([createKeyword])},
            });
        }
    });

    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        update(cache, {data: {deleteCategory}}) {
            const categories = cache.readQuery<{ categories: Category[] }>({query: GET_CATEGORIES})!.categories;
            cache.writeQuery({
                query: GET_CATEGORIES,
                data: {categories: categories.filter(c => c.id !== deleteCategory.id)},
            });
        }
    });


    return (
        <table>
            <thead>
            <tr>
                <td>Categories</td>
                <td>Keywords</td>
                <td></td>
            </tr>
            </thead>
            <tbody>
            {props.data.map((c: Category, index: number) =>
                <tr key={index}>
                    <td onClick={() => deleteCategory({
                        variables: {
                            id: c.id,
                        }
                    })}>{c.name}</td>
                    <td>
                        {c.keywords.map((k: KeywordModel, index: number) =>
                            <Keyword name={k.name} keywordId={k.id} categoryId={c.id} key={index}></Keyword>
                        )}
                    </td>
                    <td>
                        <button onClick={async () => {
                            await setCategoryId(c.id);
                            await createKeyword({
                                variables: {
                                    categoryId: c.id,
                                    name: `test${c.keywords.length}`
                                }
                            });
                        }}>+
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    )
}

export const KeywordsTable = _KeywordsTable;
