import React from "react";
import {
    Link
  } from "react-router-dom";
import "../css/HeaderGeneral.css"

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
        <header className="headerGeneral" style={divStyle}>
            <div>
                <h2 className="text-center mt-40 mb-10 sm:mb-20 ml-5 inline-block text-2xl sm:text-4xl lg:text-5xl font-mono " > {props.mensaje}</h2>
                <div className="containerButton">
                    <Link to="/SignIn" style={buttonStyle} className="button">Sign in</Link>
                    <Link to="/LogIn" style={buttonStyle} className="button">Login</Link>
                </div>
            </div>
        </header>
    </>
    );
  }

export default HeaderGeneral;