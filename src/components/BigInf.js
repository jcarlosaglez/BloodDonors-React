import React from "react";

function BigInf(props) {    
    return (
        <section className={props.rev ? "flex" : "flexReverse" }>
            <article className="">
                <h2 className="">{props.data.title}</h2>
                <hr className=""/>
                <p className="">{props.data.text}</p>
            </article>
            <article className="">
                <img className="" src={props.data.url} alt={props.data.alt}/>
            </article> 
        </section>
        )
    }

export default BigInf;