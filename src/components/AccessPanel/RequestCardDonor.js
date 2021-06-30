import PropTypes from 'prop-types';
import {useState} from "react";

function RequestCardDonor(props){
        const request = props.request;
		const [statusReques, useStatusReques] = useState(request.status);
		const responderRequest = props.responderRequest;

        const HandleStatus = (respuesta) => {
            console.log(responderRequest(request, respuesta));
            useStatusReques(respuesta);
        }
		
    return(
        <div>
            <div>
                <h2> Solicitud de donador</h2>
                <div>
                    <h3> Donador: {request.id_receiver.first_name} </h3>
                    <h3> Tipo de sangre: {request.required_blood_type }</h3>
                </div>
                <div>
                    <h4> Mensaje: </h4>
                    <p> {request.message}</p>
                </div>
                <div>
                    <h4>Estado de la solicitud</h4>
                    <p> {statusReques} </p>
                </div>
            </div>
            <div>
                <button onClick={() => HandleStatus("aceptada")}>Aceptar</button>
                <button onClick={() => HandleStatus("rechazada")}>Rechazar</button>
            </div>
        </div>
    )
}
RequestCardDonor.prototype = {
    request: PropTypes.object.isRequired,
}

export default RequestCardDonor;
