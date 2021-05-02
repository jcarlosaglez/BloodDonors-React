import React from "react";

function SectionOfTitle(props) {

    return (
    <>
        <div className="mx-5 my-20 py-2 border-t-4 border-b-4 border-gray-700">
            <h2 className="text-4xl sm:text-5xl text-center text-gray-800"> {props.title}</h2>
        </div>
    </>
    );
  }

export default SectionOfTitle;