import React from 'react';
import './App.scss';
import {useQuery} from '@apollo/client';
import {GET_CATEGORIES} from "./queries";
import {Category} from "./models/category.model";
import {Keyword} from "./models/keyword.model";

function App() {
    const {loading, error, data} = useQuery(GET_CATEGORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="App">
            <table>
                <thead>
                <tr>
                    <td>Categories</td>
                    <td>Keywords</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {data.categories.map((c: Category, index: number) =>
                    <tr key={index}>
                        <td>{c.name}</td>
                        <td>
                            {c.keywords.map((k: Keyword, index: number) =>
                                <div key={index} className="keyword">{k.name}</div>)}</td>
                        <td>
                            <button>+</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>

        </div>
    );
}

export default App;
