import React from "react";
import HeaderCom from "./HeaderCom";
import SecTitle from "./SecTitle";
import Container from "./Container";
import BigInf from "./BigInf";
import DataCard from "../assets/data/tiposSanguineos";
import DataInf from "../assets/data/beneficios";

function Home(props) {
    return (
    <>
        <HeaderCom
            mensaje="El donar sangre puede cambiar una vida"
            colorT="white"
            imagen="https://images.unsplash.com/photo-1524721696987-b9527df9e512?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80"
        />
        <SecTitle title="¿Por qué donar sangre?" />
        <BigInf data={DataInf[0]} rev={true}/>
        <Container data={DataCard[0]} />
        <SecTitle title="Beneficios" />
        <Container data={DataCard[1]} />
    </>
    );
  }

export default Home;
                    