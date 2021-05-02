import React from "react";
import '../css/SectionBGTransparent.css'

function SectionBGTransparent(props) {
    const imgUrl = props.imagen;

    const divStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 1)), 
        url(${imgUrl}})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
    };
    return (
        <section className="ContainerTransparent" style={divStyle}>
            <h2 className=""> HOla </h2>
            <h3> Que tal</h3>
            {props.children}
        </section>
        )
    }

export default SectionBGTransparent;