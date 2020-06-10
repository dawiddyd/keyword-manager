import React, {useState} from 'react';
import {Category} from "../../models/category.model";
import {Keyword as KeywordModel} from "../../models/keyword.model";
import {Keyword} from "../keyword";
import {useMutation} from "@apollo/client";
import {CREATE_KEYWORD, DELETE_KEYWORD, GET_CATEGORIES} from "../../queries";

interface OwnProps {
    data: Category[];
}

const _KeywordsTable = (props: OwnProps) => {
    const [categoryId, setCategoryId] = useState();
    const refetchQueries = [{query: GET_CATEGORIES}];
    const [createKeyword] = useMutation(CREATE_KEYWORD, {
        onCompleted: (keywords) => {
            console.log(props.data.find((c: Category) => c.id === categoryId)!.keywords);
        }
    });
    const [deleteKeyword] = useMutation(DELETE_KEYWORD, {refetchQueries: refetchQueries});

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
                    <td>{c.name}</td>
                    <td>
                        {c.keywords.map((k: KeywordModel, index: number) =>
                            <Keyword name={k.name} key={index} onClick={() => deleteKeyword({
                                variables: {
                                    categoryId: c.id,
                                    keywordId: k.id
                                }
                            })
                            }></Keyword>)}</td>
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
