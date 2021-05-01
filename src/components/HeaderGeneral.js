import React from "react";
import {
    Link
  } from "react-router-dom";

function HeaderGeneral(props) {
    const col = props.colorT;
    const imgUrl = props.imagen;

    const divStyle = {
        color: col,
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), 
        url(${imgUrl}})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };
    const buttonStyle = {
        display: props.buttonMos
    }
    return (
    <>
        <header className="h-96 bg-blue-200" style={divStyle}>
            <div className="flex flex-col items-center w-full sm:w-3/5 lg:w-1/2">
                <h2 className="text-center mt-40 mb-10 sm:mb-20 ml-5 inline-block text-2xl sm:text-4xl lg:text-5xl font-mono " > {props.mensaje}</h2>
                <Link to="/about" style={buttonStyle} className="w-auto border-2 border-red-600 bg-transparent hover:bg-red-600 hover:bg-red-600 p-3 rounded-2xl text-red-600 hover:text-white text-xl font-black">Sing in</Link>
            </div>
        </header>
    </>
    );
  }

export default HeaderGeneral;