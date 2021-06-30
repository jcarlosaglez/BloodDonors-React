import { useState, useEffect } from "react";
import RequestCard from "./RequestCard";
import useAuth from "../Auth/useAuth";

const ContactDonor = (props) => {
		const auth = useAuth();
		const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getData = async () =>
        {
            const url = auth.url[0] + "request" + auth.url[1] + "/";
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const dataServ = await response.json();
				const resp = await dataServ.filter((dat) => dat.id_receiver._id === props.me.id && (dat.status !== "Cancelada")); 
                setRequests(resp);
            }
            catch(e) {
                console.error(e);
            }
        }
        getData();
    },[]);

		async function deletRequest(request) {
			console.log("Hola");
            try {
                const response = await fetch(`https://blood-donors-v1.herokuapp.com/v1/requests/${request.id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ auth.user.token
                    }
                });
                const dataServ = await response.json();
                console.log(dataServ);
								request.status = "Cancelada";
            }
            catch(e) {
                console.error(e);
            }
		}

	return(
		<div>
			{ requests.length !== 0 ?
				requests.map(request => <RequestCard key={request.id} request={request} deletRequest={deletRequest}/>)
				: <h2> No hay solicitudes </h2>
			}
		</div>
	)
}
export default ContactDonor;
