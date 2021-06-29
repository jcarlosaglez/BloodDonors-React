import { useState, useEffect } from "react";
import RequestCard from "./RequestCard";

const ContactDonor = (props) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getData = async () =>
        {
            try {
                const response = await fetch("https://blood-donors-v1.herokuapp.com/v1/requests/", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const dataServ = await response.json();
								const resp = await dataServ.filter((dat) => dat.id_receiver._id === props.me.id ); 
                setRequests(resp);
            }
            catch(e) {
                console.error(e);
            }
        }
        getData();
    },[]);

	return(
		<div>
			{ requests.length !== 0 ?
				requests.map(request => <RequestCard key={request.id} request={request} />)
				: <h2> No hay solicitudes </h2>
			}
		</div>
	)
}
export default ContactDonor;
