import React from "react";
import Card from "./Card";

function TranspSec(props) {
    const imgUrl = props.imagen;

    const divStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), 
        url(${imgUrl}})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
    };

    const data = props.data;
    let roots = data.map((product, index, array) => {
        return <Card datos={product} key={index} />;})
    return (
        <section className="" style={divStyle}>
            <h2 className=""> HOla </h2>
            <h3> Que tal</h3>
            <div className="">
                {roots}   
            </div>
        </section>
        )
    }

export default TranspSec;