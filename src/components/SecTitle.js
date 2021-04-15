import React from "react";

function SecTitle(props) {

    return (
    <>
        <div className="m-5 py-2 border-t-4 border-b-4 border-gray-700">
            <h2 className="text-5xl text-center text-gray-800"> {props.title}</h2>
        </div>
    </>
    );
  }

export default SecTitle;