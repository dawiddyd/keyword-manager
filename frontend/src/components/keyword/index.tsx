import React from 'react';

interface OwnProps {
    onClick: () => void;
    name: string;
}

const _Keyword = (props: OwnProps) => (
    <div
        onClick={props.onClick}
        className="keyword"
    >
        {props.name}
    </div>
);

export const Keyword = _Keyword;
