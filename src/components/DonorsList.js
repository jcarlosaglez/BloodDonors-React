import React from "react";
import "../css/DonorsList.css";
import DonorCard from "./DonorCard";

const DonorsList = (props) =>{
    const [donors, setDonors] = React.useState([]);

    React.useEffect(() => {
        const getData = async () =>
        {
            try {
                const response = await fetch("https://blood-donors-v1.herokuapp.com/v1/donors", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                // console.log("completado:", data);
                setDonors(data);
            }
            catch(e) {
                console.error(e);
            }
        }
        getData();
    }, []);

    return(
        <div className="list-container">
            <h1>Lista de donadores</h1>

            {donors.map(donor => <DonorCard key={donor.id} donor={donor} />)}
            
        </div>
    )
}

export default DonorsList;