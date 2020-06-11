import React from 'react';
import {Category} from "../../models/category.model";
import {Keyword as KeywordModel} from "../../models/keyword.model";
import {Keyword} from "../keyword";
import {useMutation} from "@apollo/client";
import {DELETE_CATEGORY, GET_CATEGORIES} from "../../queries";
import {toast} from "react-toastify";
import {NewCategoryForm} from "../new-category-form";
import {NewKeywordForm} from "../new-keyword-form"

interface OwnProps {
    data: Category[];
}

const _KeywordsTable = (props: OwnProps) => {

    const [deleteCategory] = useMutation(DELETE_CATEGORY, {
        update(cache, {data: {deleteCategory}}) {
            const categories = cache.readQuery<{ categories: Category[] }>({query: GET_CATEGORIES})!.categories;
            cache.writeQuery({
                query: GET_CATEGORIES,
                data: {categories: categories.filter(c => c.id !== deleteCategory.id)},
            });
        },
        onCompleted(data) {
            toast(`Successfully removed category ${data.deleteCategory.name}`);
        }
    });


    return (
        <div className="table-wrapper">
            <NewCategoryForm></NewCategoryForm>
            <table className="table keywords-table">
                <thead>
                <tr>
                    <th>Categories</th>
                    <th>Keywords</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {props.data.map((c: Category, index: number) =>
                    <tr key={index} className="category-row">
                        <td className="category-name" onClick={() => deleteCategory({
                            variables: {
                                id: c.id,
                            }
                        })}>{c.name}</td>
                        <td className="category-keywords">
                            {c.keywords.map((k: KeywordModel, index: number) =>
                                <Keyword name={k.name} keywordId={k.id} categoryId={c.id} key={index}></Keyword>
                            )}
                        </td>
                        <td className="category-action">
                            <NewKeywordForm categoryId={c.id}></NewKeywordForm>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export const KeywordsTable = _KeywordsTable;
