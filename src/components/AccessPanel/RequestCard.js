import PropTypes from 'prop-types';
import useAuth from "../Auth/useAuth";

function RequestCard(props){
		const auth = useAuth();
		const request = props.request;
		const deletRequest = props.deletRequest;
		
    return(
        <div>
            <div>
                <h2> Solicitud de donador </h2>
                <div>
                    <h3> Donador: {request.id_donor.first_name} </h3>
                    <h3> Tipo de sangre: {request.required_blood_type }</h3>
                </div>
                <div>
                    <h4> Mensaje: </h4>
                    <p> {request.message}</p>
                </div>
								<div>
									<h4>Estado de la solicitud</h4>
									<p> {request.status} </p>
								</div>
            </div>
            <div>
                <button onClick={() => deletRequest(request)}>Cancelar </button>
            </div>
        </div>
    )
}
RequestCard.prototype = {
    request: PropTypes.object.isRequired,
}

export default RequestCard;
