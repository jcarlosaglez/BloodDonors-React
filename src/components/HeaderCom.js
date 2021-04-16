import React from "react";

function HeaderCom(props) {
    const col = props.colorT;
    const imgUrl = props.imagen;

    const divStyle = {
        color: col,
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), 
        url(${imgUrl}})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };
    return (
    <>
        <header className="h-96 bg-blue-200" style={divStyle}>
            <h2 className="text-center mt-40 ml-5 inline-block text-2xl sm:text-4xl lg:text-5xl w-1/2 font-mono " > {props.mensaje}</h2>
        </header>
    </>
    );
  }

export default HeaderCom;