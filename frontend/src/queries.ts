import {gql} from "@apollo/client";

export const GET_CATEGORIES = gql`
    query getCategories {
        categories {
            id
            name
            keywords {
                id
                name
            }
        }
    }
`;

export const CREATE_KEYWORD = gql`
    mutation createKeyword($categoryId: Float!, $name: String!) {
        createKeyword(categoryId: $categoryId, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_KEYWORD = gql`
    mutation deleteKeyword($categoryId: Float!, $keywordId: Float!) {
        deleteKeyword(categoryId: $categoryId, keywordId: $keywordId)
    }
`;

export const DELETE_CATEGORY = gql`
    mutation deleteCategory($id: Float!) {
        deleteCategory(id: $id) {
            id
            name
        }
    }
`;


