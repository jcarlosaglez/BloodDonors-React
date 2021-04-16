import React from "react";
import HeaderCom from "./HeaderCom";
import SecTitle from "./SecTitle";
import CardHero from "./CardHero";
import Data from "./home.json";

function Home(props) {
    const data = Data;
    let roots = data.map((product, index, array) => {
        return <CardHero datos={data[index]} key={index} />;})

    return (
    <>
        <HeaderCom
            mensaje="El donar sangre puede cambiar una vida"
            colorT="white"
            imagen="https://images.unsplash.com/photo-1524721696987-b9527df9e512?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80"
        />
        <SecTitle title="Beneficios" />
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {roots}   
        </div>
    </>
    );
  }

export default Home;
                    