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
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ auth.user.token
                    }
                });
                const dataServ = await response.json();
                console.log(dataServ.data)
				const resp = await dataServ.data.filter((dat) => dat.id_donor === props.me.id && (dat.status !== "Cancelada" && (dat.status !== "eliminada") && dat.status !== "rechazada")); 
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
            console.log(url)
            try {
                const dataUp = {status: respuesta}
                const response = await fetch(url, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ auth.user.token
                    },
                    body:  JSON.stringify(dataUp)
                })
                const dataServ = await response.json();
                console.log(dataServ, respuesta);
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
