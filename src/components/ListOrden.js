import React from "react";
import PropTypes from 'prop-types';

function ListOrden(props) {
    const data = props.data;
    let roots = data.map((product, index, array) => {
        return <li className="my-1" key={index} >  {product} </li>;})
    return (
        <div className="mx-10 sm:mx-20 lg:mx-44">
            <ol className="list-decimal text-justify">
                {roots}
            </ol>
        </div>
    )
}
ListOrden.propTypes = {
    data: PropTypes.array.isRequired
}
export default ListOrden;