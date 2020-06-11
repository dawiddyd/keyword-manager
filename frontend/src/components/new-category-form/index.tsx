import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {CREATE_CATEGORY, GET_CATEGORIES} from "../../queries";
import {toast} from "react-toastify";
import {Category} from "../../models/category.model";

const _NewCategoryForm = () => {
    const [categoryName, setCategoryName] = useState();
    const [buttonVisible, setButtonVisible] = useState(false);
    const [createCategory] = useMutation(CREATE_CATEGORY, {
        variables: {
            name: categoryName
        },
        update(cache, {data: {createCategory}}) {
            const categories = cache.readQuery<{ categories: Category[] }>({query: GET_CATEGORIES})!.categories;
            cache.writeQuery({
                query: GET_CATEGORIES,
                data: {categories: [...categories, createCategory]},
            });
        },
        onCompleted(data) {
            toast(`Successfully created category ${data.createCategory.name}`);
        }
    });

    return (
        <div>
            <button onClick={() => setButtonVisible(!buttonVisible)}>New Category</button>
            {buttonVisible && <input onChange={(event) => setCategoryName(event.target.value)} type="text"/>}
            {buttonVisible && <button onClick={async () => {
                await createCategory();
                setButtonVisible(false)
            }}>Save</button>}
        </div>
    );
}

export const NewCategoryForm = _NewCategoryForm;
