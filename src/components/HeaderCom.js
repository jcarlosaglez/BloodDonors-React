import React from "react";

function HeaderCom(props) {
    const col = props.colorT;
    const imgUrl = props.imagen;

    const divStyle = {
        color: col,
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };
    return (
    <>
        <header className="h-96 bg-blue-200" style={divStyle}>
            <h2 className="text-center mt-20 ml-5 inline-block text-2xl w-1/2" > {props.mensaje}</h2>
        </header>
    </>
    );
  }

export default HeaderCom;