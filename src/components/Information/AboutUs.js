import React from "react";
import HeaderGeneral from "./HeaderGeneral";
import CardUniqInf from "./CardUniqInf";

//import CSS
import "../../css/AboutUs/AboutUs.css";

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
      <div className="AboutUs">
        <p>
          Somos un grupo de desarrollaores web mexicanos que esta conformado por entusiastas y profesionales del desarrollo de sofware,
          teniendo integrantes de diferentes carreras formando un equipo capas de resolver problemas de iferentes areas. 
          Nos enfocados en el desarrollo web fullstack con javascript. 
          Conociendo tecnologías como HTML5, CSS2, CSS3, Vanilla Js, React JS, Node JS, entre otras. Siendo muy chambeaores y dedicados.
        </p>
        <br></br>
        <p> Phasellus dapibus est arcu, ac placerat dolor tempor vitae. Quisque ut convallis sapien. Phasellus ligula lacus, eleifend sed nunc id, maximus tincidunt erat. Donec arcu neque, consectetur eget ultrices eu, placerat vel erat. Duis non felis vestibulum, molestie dolor vel, imperdiet eros. Donec sed est at tortor fringilla porta. Sed nibh ante, vehicula in pretium ac, pulvinar ut elit. Nam mollis, leo eget scelerisque sagittis, elit ipsum efficitur dui, feugiat condimentum ante ex ut mauris. Pellentesque porttitor in urna ut ultrices. Ut non luctus odio. Ut posuere varius arcu ut gravida. Fusce id sagittis lectus. Praesent pretium nisi eget lorem fermentum, ut porttitor justo efficitur. Aliquam iaculis, arcu at elementum dignissim, tellus urna feugiat turpis, at malesuada nunc diam nec leo. Quisque molestie ipsum nec nulla iaculis laoreet lobortis ac turpis. Praesent congue urna at nulla dapibus, ut feugiat tortor viverra. </p>
        <CardUniqInf data={DataInf[0]} rev={true} />
        <CardUniqInf data={DataInf[1]} rev={false} />
        <CardUniqInf data={DataInf[2]} rev={true} />
        <CardUniqInf data={DataInf[3]} rev={false} />
      </div>
     </>
    );
  }

export default Nosotros;
                    