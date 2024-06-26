import './style/Container.css';
import React from "react";

export default function Container(props) {

    const { children } = props;

    return (
        <div className="Container">
            { children }
        </div>
    );
}
