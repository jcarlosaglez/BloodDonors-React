import React, {useState} from 'react';

import "../css/Form.css";
// import InputOfText from "./InputOfText";

const URL = "https://blood-donors-v1.herokuapp.com/v1/receivers/"
function Signin() {
    const [data, setData] = React.useState({});
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":""        
    })
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }
    const goToBackend = (config, data) => {
        return fetch(config.url, {
          method: config.method,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        })
    }
    
    const enviarDatos = async (event) => {
        event.preventDefault()

        //Servidor
        const config ={
            url: URL,
            method: "POST"
        };
        try {
            const response = await goToBackend(config, datos);
            if (!response.ok) /* throw new Error("Response not ok", response); */console.log(response);
            const todo = await response.json();
            setData(todo);
            console.log("data", data, response);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div>
                <form onSubmit={enviarDatos}>
                <div className="">
                        <h1 className="">Registro de receptor</h1>

                        <div className="">
                            <div className="">
                                <div className="">
                                    <label htmlFor="curp" className="">
                                        Curp:
                                    </label>
                                    <input
                                        type="text"
                                        name="curp"
                                        id="curp"
                                        className=""
                                        placeholder="XXXX000000XXXXXX00"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="first_name" className="">
                                        Nombre(s):
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        autoComplete="first_name"
                                        className=""
                                        placeholder="Carlos"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="last_name" className="">
                                        Apellidos:
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        className=""
                                        placeholder="Perez"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="birthday" className="">
                                        Fecha de nacimiento:
                                    </label>
                                    <input
                                        type="date"
                                        name="birthday"
                                        id="birthday"
                                        className=""
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="" className="">
                                        Genero:
                                    </label>

                                    <div className="">
                                        <input className="" type="radio" id="male" value="male" name="gender" onChange={handleInputChange}/>
                                        <label className="">Hombre</label>

                                        <input className="" type="radio" id="female" value="female" name="gender" onChange={handleInputChange}/>
                                        <label className="" htmlFor="female">Mujer</label>
                                        
                                        <input className="" type="radio" id="non-binary" value="non-binary" name="gender" onChange={handleInputChange}/>
                                        <label className="" htmlFor="non-binary">No Binario</label>
                                    </div>
                                </div>
                                
                                <div className="">
                                    <label htmlFor="email" className="">
                                        Correo:
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className=""
                                        placeholder="correo@dominio.com"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="password" className="">
                                        Contraseña:
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className=""
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="phone_number" className="">
                                        Telefono:
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        id="phone_number"
                                        className=""
                                        placeholder="0000000000"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="place_of_residence" className="">
                                        Lugar de residencia:
                                    </label>
                                    <input
                                        type="text"
                                        name="place_of_residence"
                                        id="place_of_residence"
                                        className=""
                                        placeholder="ciudad - codigo postal"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <button
                                type="submit"
                                className=""
                            >
                            Registro
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}


export default Signin;