import { useState, useEffect } from "react";
import RequestCardDonor from "./RequestCardDonor";
import useAuth from "../Auth/useAuth";

const ContactDonor = (props) => {
		const auth = useAuth();
		const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getData = async () =>
        {
            const url = auth.url[0]+ "request"+auth.url[1]+"/"
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const dataServ = await response.json();
				const resp = await dataServ.filter((dat) => dat.id_donor._id === props.me.id && (dat.status !== "Cancelada" && dat.status !== "Rechazada")); 
                setRequests(resp);
            }
            catch(e) {
                console.error(e);
            }
        }
        getData();
    },[]);

		async function responderRequest(request, respuesta) {
			console.log("Hola");
            const url = auth.url[0] + "request" + auth.url[1] + "/" + request.id;
            try {
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ auth.user.token
                    },
                    body: {
                        "status": respuesta
                    }
                })
                const dataServ = await response.json();
                console.log(dataServ);
				return respuesta;
            }
            catch(e) {
                console.error(e);
            }
		}

	return(
		<div>
			{ requests.length !== 0 ?
				requests.map(request => <RequestCardDonor key={request.id} request={request} responderRequest={responderRequest}/>)
				: <h2> No hay solicitudes </h2>
			}
		</div>
	)
}
export default ContactDonor;
