import React from "react";
import HeaderGeneral from "./HeaderGeneral";
import CardUniqInf from "./CardUniqInf";

//import CSS
import "../../css/AboutUs/AboutUs.css";
import '../../css/Information/HomeInformation.css'

//Datos estaticos
import DataInf from "../../assets/data/AboutUs";

function Nosotros() {
    return (
      <>
        <HeaderGeneral
        title="Somos un grupo de desarrolladores mexicanos"
        colorT="white"
        buttonMos="none"
        image="https://images.unsplash.com/photo-1544890225-2f3faec4cd60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80"
        />
        <div className="AboutUs padding">
          <p>
            Somos un grupo de desarrollaores web mexicanos que esta conformado por entusiastas y profesionales del desarrollo de sofware,
            teniendo integrantes de diferentes carreras formando un equipo capas de resolver problemas de iferentes areas. 
            Nos enfocados en el desarrollo web fullstack con javascript. 
            Conociendo tecnologías como HTML5, CSS2, CSS3, Vanilla Js, React JS, Node JS, entre otras. Siendo muy chambeaores y dedicados.
          </p>
          <br></br>
          <p>La aplicación Blood-Index nació por la  necesiad de encontrar donadores voluntarios, ya que en México se ha visto un 
            notable decremento en las personas que pertenecen a este grupo, por lo que con esta aplicación pensamos en tener un acercamiento con las 
            personas para darle no solo un caracter informativo si no conectar directamente gente que necesita de un donador con los que 
            tienen este deseo de ayudar pero ya sea por mala información aun no se animan. 
          </p>
          <CardUniqInf data={DataInf[0]} rev={true} />
          <CardUniqInf data={DataInf[1]} rev={false} />
          <CardUniqInf data={DataInf[2]} rev={true} />
        </div>
     </>
    );
  }

export default Nosotros;
                    