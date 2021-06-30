import React from "react";
import {Link} from "react-router-dom";
import "../../css/DonorCard.css"
import PropTypes from 'prop-types';
//datos
import Hospital from '../../assets/data/HospitalCdMx';

import useAuth from "../Auth/useAuth";

const DonorCard = (props) => {
		const auth = useAuth();
		const contacDonor = () => {
        const getData = async () =>
        {
            const data = {
                id_donor: props.donor.id,
                required_blood_type: props.me.blood_type,
                message: props.me.message 
            }
            console.log(data, auth.user.token)
            const url = auth.url[0] + "request" + auth.url[1] + "/";
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ auth.user.token
                    }, 
                    body: JSON.stringify(data)
                });
                console.log(response)
            }
            catch(e) {
                console.error(e);
            }
        }
        getData();
    };
    const hosp = Hospital.find((hos) => props.donor.clave_hospital === hos.clave);
    return(
        <div className="donor-card">
            <h2>{props.donor.first_name}</h2>
            <p>Tipo de sangre: {props.donor.blood_type}</p>
            <p>Ubicación: { hosp.name }</p>
            <div className="flex">
                <Link onClick={() => contacDonor()}>Contactar</Link>
            </div>
        </div>
    )
}
DonorCard.propTypes = {
    donor: PropTypes.object.isRequired
}
export default DonorCard;
