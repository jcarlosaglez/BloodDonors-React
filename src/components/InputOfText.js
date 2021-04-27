import PropTypes from 'prop-types';

const InputOfText = (props) => 
    <>
        <laber>
        {props.children}
        <input
            className=""
            type="text"
            name={props.name}
            id={props.name}
            placeholder={props.holder}
        />
        </laber>

    </>


InputOfText.propTypes = {
    name: PropTypes.string.isRequired,
    holder: PropTypes.string.isRequired
}


export default InputOfText;