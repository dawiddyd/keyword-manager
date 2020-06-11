import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {CREATE_CATEGORY, GET_CATEGORIES} from "../../queries";
import {toast} from "react-toastify";
import {Category} from "../../models/category.model";
import {Button} from "../button"

interface OwnProps {
    className?: string;
}

const _NewCategoryForm = (props: OwnProps) => {
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
        <div className="new-category-form">
            {buttonVisible && <input className="new-category-form__name-input" placeholder="Category name"
                                     onChange={(event) => setCategoryName(event.target.value)} type="text"/>}
            {buttonVisible &&
            <Button title={"Save"} disabled={!categoryName} className="new-category-form__button button"
                    onClick={async () => {
                        await createCategory();
                        setButtonVisible(false);
                        setCategoryName(null);
                    }}></Button>}
            <Button title="+ AddCategory" className="new-category-form__button button"
                    onClick={() => setButtonVisible(!buttonVisible)}></Button>
        </div>
    );
}

export const NewCategoryForm = _NewCategoryForm;
