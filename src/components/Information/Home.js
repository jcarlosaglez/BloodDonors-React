import React from "react";
import HeaderGeneral from "./HeaderGeneral";
import SectionOfTitle from "./SectionOfTitle";
import Container from "./Container";
import BigInf from "./CardUniqInf";
import SectionBGTransparent from "./SectionBGTransparent";
import DataCard from "../../assets/data/datosCards";
import DataInf from "../../assets/data/datosGrande";

//CSS
import '../../css/Information/HomeInformation.css'

function Home(props) {
    return (
    <>
        <HeaderGeneral
            title="El donar sangre puede cambiar una vida"
            colorT="white"
            image="https://images.unsplash.com/photo-1524721696987-b9527df9e512?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80"
        />
        <div className="padding">
            <SectionOfTitle title="¿Por qué donar sangre?" />
            <BigInf data={DataInf[0]} rev={true}/>
            <Container data={DataCard[0]} />
            <SectionBGTransparent imagen="https://images.unsplash.com/photo-1602696491509-7e7a8adc761b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFpc2FqZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
                <div>
                    <div className="title-information">
                        <h2> Mira más alla </h2>
                        <h3> El donar sangre puede salvar mas de una vida </h3>
                    </div>
                    <Container data={DataCard[2]} />
                </div>
            </SectionBGTransparent>
            <SectionOfTitle title="Grupos Sanguíneos" />
            <Container data={DataCard[1]} />
        </div>
    </>
    );
  }

export default Home;
                    