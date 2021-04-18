import React from "react";
import HeaderCom from "./HeaderCom";
import SecTitle from "./SecTitle";
import ListOrden from "./ListOrden";
import requirements from "../assets/data/requirements";
import recommen from "../assets/data/recommendations";

function Users() {
    return (
      <>
        <HeaderCom
        mensaje="Requisitos para donar sangre"
        colorT="white"
        imagen="https://images.unsplash.com/photo-1519032465794-2da0ceef0b63?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
        />
        <SecTitle title="Los requisitos mínimos para donar sangre"/>
        <ListOrden data={requirements} />
        <SecTitle title="Recomendaciones"/>
        <ListOrden data={recommen} />
      </>
    );
  }

export default Users;
                    