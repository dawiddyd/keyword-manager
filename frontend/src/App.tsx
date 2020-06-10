import React from 'react';
import './App.scss';
import {useQuery} from '@apollo/client';
import {GET_CATEGORIES} from "./queries";
import {KeywordsTable} from "./components/keywords-table";

function App() {
    const {loading, error, data} = useQuery(GET_CATEGORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="App">
            <KeywordsTable data={data.categories}></KeywordsTable>
        </div>
    );
}

export default App;
