import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {CREATE_KEYWORD, GET_CATEGORIES} from "../../queries";
import {toast} from "react-toastify";
import {Category} from "../../models/category.model";

interface OwnProps {
    categoryId: number;
    className?: string;
}

const _NewKeywordForm = (props: OwnProps) => {
    const [keywordName, setKeywordName] = useState();
    const [buttonVisible, setButtonVisible] = useState(false);
    const [createKeyword] = useMutation(CREATE_KEYWORD, {
        variables: {
            categoryId: props.categoryId,
            name: keywordName
        },
        update(cache, {data: {createKeyword}}) {
            const categories = cache.readQuery<{ categories: Category[] }>({query: GET_CATEGORIES})!.categories;
            cache.writeQuery({
                query: GET_CATEGORIES,
                data: {categories: categories.concat([createKeyword])},
            });
        },
        onCompleted(data) {
            toast(`Successfully created keyword ${data.createKeyword.pop().name}`);
        }
    });

    return (
        <div className="new-keyword-form">
            {buttonVisible && <input className="new-keyword-form__name-input" placeholder="Keyword name"
                                     onChange={(event) => setKeywordName(event.target.value)} type="text"/>}
            {buttonVisible && <button className="new-keyword-form__button button" onClick={async () => {
                await createKeyword();
                setButtonVisible(false)
            }}>Save</button>}
            <button className="new-keyword-form__button button" onClick={() => setButtonVisible(!buttonVisible)}>+
            </button>
        </div>
    );
}

export const NewKeywordForm = _NewKeywordForm;
