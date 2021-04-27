import React, { useState } from 'react';

import "../css/Form.css";
import InputOfText from "./InputOfText";

function Signin() {
    const [age, setAge] = useState();
    const [fruit, setFruit] = useState('');
    const [todos, setTodos] = useState('');
    return (
        <>
            <div>
                <form>
                    <div>
                        <InputOfText 
                                name="first_name"
                                holder="Ej. Juan"
                            >
                            Nombre:
                        </InputOfText>
                        <InputOfText 
                                name="first_name"
                                holder="Ej. Juan"
                            >
                            Nombre:
                        </InputOfText>
                    </div>
                </form>
            </div>

        </>
    );
}


export default Signin;