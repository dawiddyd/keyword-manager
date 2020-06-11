import React from 'react';
import {useMutation} from "@apollo/client";
import {DELETE_KEYWORD, GET_CATEGORIES} from "../../queries";
import {toast} from "react-toastify";
import {Category} from "../../models/category.model";

interface OwnProps {
    name: string;
    keywordId: number;
    categoryId: number;
}

const _Keyword = (props: OwnProps) => {
    const [deleteKeyword] = useMutation(DELETE_KEYWORD, {
        update(cache, {data: {deleteKeyword}}) {
            const categories = cache.readQuery<{ categories: Category[] }>({query: GET_CATEGORIES})!.categories;
            cache.writeQuery({
                query: GET_CATEGORIES,
                data: {categories: categories.map(c => c.keywords.filter(k => k.id !== props.keywordId))},
            });
        },
        onCompleted(data) {
            toast(`Successfully removed keyword`);
        }
    });

    return (
        <div
            onClick={() => deleteKeyword({
                variables: {
                    categoryId: props.categoryId,
                    keywordId: props.keywordId
                }
            })}
            className="keyword"
        >
            {props.name}
        </div>
    );
}

export const Keyword = _Keyword;
