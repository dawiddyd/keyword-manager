import React from 'react';
import './stylesheets/main.scss';
import {useQuery} from '@apollo/client';
import {GET_CATEGORIES} from "./queries";
import {KeywordsTable} from "./components/keywords-table";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { StatePage } from "./components/state-page";

function App() {
    const {loading, error, data} = useQuery(GET_CATEGORIES);

    if (loading) return <StatePage title="Loading..."></StatePage>;
    if (error) return <StatePage title="Error :(" message="Cannot connect to the server"></StatePage>;

    return (
        <div className="App">
            <ToastContainer newestOnTop/>
            <KeywordsTable data={data.categories}></KeywordsTable>
        </div>
    );
}

export default App;
