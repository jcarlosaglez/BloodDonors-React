import React from "react"
import PanelHome from "./AccessPanel/PanelHome";
import User from  "./AccessPanel/User";

//Css
import "../css/AccessPanel/AcessPanel.css";

function AccessPanel() { 
  const me = {
    first_name: "Juan",
    email: "juang20@gmail.com",
    id: "609032da0f127e0015984fd9"
  }
    return (
      <div className="accesPanel">
          <User me={me}/>
          <PanelHome me={me} />
      </div>
    );
}
export default AccessPanel;
