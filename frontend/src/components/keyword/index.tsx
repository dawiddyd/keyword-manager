import React from 'react';
import {useMutation} from "@apollo/client";
import {DELETE_KEYWORD, GET_CATEGORIES} from "../../queries";
import {toast} from "react-toastify";

interface OwnProps {
    name: string;
    keywordId: number;
    categoryId: number;
}

const _Keyword = (props: OwnProps) => {
    const refetchQueries = [{query: GET_CATEGORIES}];
    const [deleteKeyword] = useMutation(DELETE_KEYWORD, {
        refetchQueries: refetchQueries,
        onCompleted(data) {
            toast(`Successfully removed keyword`)
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
