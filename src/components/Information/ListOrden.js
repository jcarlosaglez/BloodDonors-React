import React from "react";
import PropTypes from 'prop-types';
import '../../css/Information/ListOrden.css';

function ListOrden(props) {
    const data = props.data;
    let roots = data.map((product, index, array) => {
        return <li key={index} >  {product} </li>;})
    return (
        <div className="container-list">
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