import React from 'react';
import './App.css';
import {useQuery} from '@apollo/client';
import {GET_CATEGORIES} from "./queries";

function App() {
    const {loading, error, data} = useQuery(GET_CATEGORIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div className="App">
            {JSON.stringify(data)}
        </div>
    );
}

export default App;
