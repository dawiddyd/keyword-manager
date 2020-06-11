import React from 'react';

interface OwnProps {
    title: string;
    type?: string;
    className?: string;
    id?: string;
    onClick?: () => void;
    disabled?: any;
}

const _Button = (props: OwnProps) => {
    return (
            <button className={props.className}
                // @ts-ignore
                    type={props.type}
                    onClick={props.onClick}
                    disabled={props.disabled}
                    id={props.id}>
                {props.title}
            </button>
    );
}

export const Button = _Button;
