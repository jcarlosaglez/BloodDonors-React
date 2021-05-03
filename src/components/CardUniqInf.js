import React from "react";
import '../css/CardUniqInf.css'

function CardUniqInf(props) {    
    return (
        <section className={props.rev ? "flex containerFlex" : "flexReverse containerFlex" }>
            <article className="InfoText">
                <h2 className="">{props.data.title}</h2>
                <hr className=""/>
                <p className="">{props.data.text}</p>
            </article>
            <article className="InfoImg">
                <img className="" src={props.data.url} alt={props.data.alt}/>
            </article> 
        </section>
        )
    }

export default CardUniqInf;