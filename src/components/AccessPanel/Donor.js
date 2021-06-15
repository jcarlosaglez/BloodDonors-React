import React from "react";
import {useParams} from "react-router-dom";
import "../css/Donor.css"

const Donor = () =>{
    const [donor, setDonor] = React.useState({});
    let { id } = useParams();
    
    React.useEffect(() => {
        const getData = async () =>
        {
            try {
                const response = await fetch(`https://blood-donors-v1.herokuapp.com/v1/donors/${id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setDonor(data);
            }
            catch(e) {
                console.error(e);
            }
        }
        getData();
    });

    let gender = "";

    switch (donor.gender) {
        case "M":
            gender = "Hombre";
        break;

        case "F":
            gender = "Mujer";
        break;
    
        default:
            gender = donor.gender;
        break;
    }

    return(
        <div className="donor-details">
            <h1>Página de donador</h1>
            <p>{`Nombre: ${donor.first_name} ${donor.last_name}`}</p>
            <p>Ubicación: {donor.place_of_residence}</p>
            <p>Genero: {gender}</p>
            <p>Tipo de sangre: {donor.blood_type}</p>
            <div className="flex">
                <a href={"mailto:" + donor.email}>Contactar</a>
            </div>
        </div>
    )
}

export default Donor;