import React from "react";
import '../css/SectionOfTitle.css'

function SectionOfTitle(props) {

    return (
    <>
        <div className="ContainerTitle">
            <h2 className="TitleSection"> {props.title}</h2>
        </div>
    </>
    );
  }

export default SectionOfTitle;