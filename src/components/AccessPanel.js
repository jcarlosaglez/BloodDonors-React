import React from "react"
import PanelHome from "./AccessPanel/PanelHome";
import User from  "./AccessPanel/User";

//Css
import "../css/AccessPanel/AcessPanel.css";

function AccessPanel() { 
    return (
      <div className="accesPanel">
          <User />
          <PanelHome />
      </div>
    );
}
export default AccessPanel;