import React from "react";

function CardHero(props) {

    return (
    <div className="m-5">
        <article className="w-4/5 h-80 p-2 mx-auto border-2 rounded shadow-xl bg-white">
            <div className="w-4/5 h-1/2 mx-auto ">
                <img className="m-auto rounded" src={props.datos.url} alt={props.datos.alt}></img>
            </div>
            <hr />
            <div>
                <h3 className="my-5"> {props.datos.title} </h3>
                <p> {props.datos.text} </p>
            </div>
        </article>
    </div>
    );
  }

export default CardHero;