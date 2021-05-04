import React from "react";
import Request from './Request';
import DonorsList from './DonorsList';

function SearchDonors() {
    const [data, setData] = React.useState({
        id:"",
        blood_type:""
    });
    const url = "https://blood-donors-v1.herokuapp.com/v1/donors/search?filter=blood_type&value="
    return(
        <>
            <Request 
                data={data} 
                setData={setData}
            />
            {url.length > 78 ? <DonorsList url={url+data}/>: <h2> Buscar {url.length}</h2>}
        </>
    );
}

export default SearchDonors;