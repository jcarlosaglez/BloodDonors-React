import React from "react";
import CardCir from "./CardCir";

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
        return <CardCir datos={product} key={index} />;})
    return (
        <section className="my-40 h-auto lg:h-screen flex flex-col justify-center aling-around text-center" style={divStyle}>
            <h2 className="my-10"> HOla </h2>
            <h3> Que tal</h3>
            <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {roots}   
            </div>
        </section>
        )
    }

export default TranspSec;