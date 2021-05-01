import React from "react";
import Card from "./Card";

function Container(props) {
    const data = props.data;
    let roots = data.map((product, index, array) => {
        return <Card datos={product} key={index} />;})
    return (
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {roots}   
        </div>
        )
    }

export default Container;