import React from 'react';

interface OwnProps {
    title: string;
    message?: string;
}

const _StatePage= (props: OwnProps) => {

    return (
        <div className="state-page">
            <h1 className="state-page__title">{props.title}</h1>
            <p className="state-page__message">{props.message}</p>
        </div>
    )
}

export const StatePage = _StatePage;
