import React from "react";

function CardHero(props) {
    return (
    <div className="my-5">
        <article className="w-4/5 h-96 p-2 mx-auto rounded bg-transparent">
            <div className="w-4/5 h-2/5 mt-4 mx-auto ">
                <img className="m-auto w-full h-full max-h-32 rounded-full" src={props.datos.url} alt={props.datos.alt}></img>
            </div>
            <hr />
            <div className="px-1">
                <h3 className="my-5 text-center font-mono text-xl"> {props.datos.title} </h3>
                <p className="text-center font-serif"> {props.datos.text} </p>
            </div>
        </article>
    </div>
    );
  }

export default CardHero;