import React from "react";

function BigInf(props) {
    const classRec = "mx-auto my-10 w-11/12 p-5 flex flex-col sm:flex-row justify-around border-2 rounded";
    const classRecRev = "mx-auto my-10 w-11/12 p-5 flex flex-col sm:flex-row-reverse justify-around border-2 rounded";
    
    return (
        <section className={props.rev ? classRecRev : classRec }>
            <article className="w-full sm:w-5/12 my-5">
                <h2 className="text-xl text-center font-black lg:text-4xl">{props.data.title}</h2>
                <hr className="my-2"/>
                <p className="text-lg text-justify lg:text-2xl">{props.data.text}</p>
            </article>
            <article className="w-full sm:w-5/12">
                <img className="mx-auto w-full h-full rounded" src={props.data.url} alt={props.data.alt}/>
            </article> 
        </section>
        )
    }

export default BigInf;