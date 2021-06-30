import {useEffect, useState} from "react"
import PanelHome from "./AccessPanel/PanelHome";
import User from  "./AccessPanel/User";

//Css
import "../css/AccessPanel/AcessPanel.css";

//Autenticacion
import useAuth from "./Auth/useAuth";

function AccessPanel() { 
  const auth = useAuth();
  const [me, setMe] = useState({
    first_name: "Juan",
    email: "ger@ger",
    id: "609032da0f127e0015984fd9"
  })
  useEffect(() => {
    const GetData = async () =>
    {   let data;
        try {
            const response = await fetch(`https://blood-donors-v1.herokuapp.com/v1/${auth.type.typeUser === "donor" ? "donors" : "receivers"}/search?field=email&value=${auth.email}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            data = await response.json();
            setMe(data[0]);
            return
        }
        catch(e) {
            console.error(e);
        }
    }
    GetData();
  });

  return (
    <div className="accesPanel">
        <User me={me}/>
        <PanelHome me={me} />
    </div>
  );
}
export default AccessPanel;
