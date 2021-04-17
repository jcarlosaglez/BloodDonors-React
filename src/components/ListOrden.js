import React from "react";

function ListOrden(props) {
    const data = props.data;
    let roots = data.map((product, index, array) => {
        return <li className="my-1"> {product} </li>;})
    return (
        <div className="mx-10">
            <ol className="list-decimal text-justify">
                {roots}
            </ol>
        </div>
    )
}

export default ListOrden;