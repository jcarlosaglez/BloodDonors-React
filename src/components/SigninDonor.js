import React from "react";
// import {Link} from "react-router-dom";
import InputOfText from "./InputOfText";

function SigninDonor() {
    // const addUser = async (title) => {
    //     const exists = todos.find(e => title === e.title);
    
    //     if (exists) {
    //       alert(`La tarea "${title}" ya existe!`);
    //       return
    //     }
    
    //     // Cambio en el servidor
    //     const config = {
    //       url: URL,
    //       method: "POST"
    //     };
    
    //     const data = {
    //       title: title,
    //       done: false,
    //     };
    
    //     try {
    //       const response = await goToBackend(config, data);
    //       if (!response.ok) throw new Error("Response not ok");
    
    //       const todo = await response.json();
    
    //       // UI
    //       setTodos(todos.concat([todo]));
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    const addUser = () => {
        alert("Hola")
    }
    
    return (
        <div >
            <form onSubmit={addUser}>
                <div>
                    <label>
                        <InputOfText
                            name="nombre"
                            holder="Ej. Juan"
                        >
                            Nombre
                        </InputOfText>
                    </label>
                </div>
            </form>
            {/* <div className="mt-3 text-center">
                <Link to="/Signin">Registro de receptor</Link>
                <p>¿Ya tienes una cuenta? <Link to="/Login">Inicia sesión aquí</Link></p>
            </div> */}
        </div>
    );
}

export default SigninDonor;