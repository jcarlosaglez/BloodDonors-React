import React from 'react';
import PropTypes from 'prop-types';
import '../css/InputOfText.css'
function InputOfText(props) {
    return(
        <>  
            <div className="inputComponent">
                <laber className="labelInput">
                {props.children}

                <input
                    className=""
                    type={props.types}
                    name={props.title}
                    id={props.title}
                    placeholder={props.holder}
                    onChange={props.addInf()}
                />
                </laber>
            </div>
        </> 
    );
}



InputOfText.propTypes = {
    title: PropTypes.string.isRequired,
    holder: PropTypes.string.isRequired,
    types: PropTypes.string.isRequired,
    addInf: PropTypes.func.isRequired
}
InputOfText.defaultProps = {
    types: "text",
    holder: "",
}

export default InputOfText;