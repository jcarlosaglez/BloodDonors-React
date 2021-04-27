import React from "react";
import {Link} from "react-router-dom";

function SigninDonor() {
    return (
        <div className="mt-28 md:mt-16 md:w-3/12 sm:w-full mx-auto">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                    <div className="shadow overflow-hidden sm:rounded-md border">
                        <h1 className="mt-5 text-center text-2xl text-gray-700">Registro de donador</h1>

                        <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="">
                                <div className="w-full mx-auto">
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                        Curp:
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="XXXX000000XXXXXX00"
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                        Nombre(s):
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        autoComplete="email"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="Carlos"
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="last_names" className="block text-sm font-medium text-gray-700">
                                        Apellidos:
                                    </label>
                                    <input
                                        type="text"
                                        name="last_names"
                                        id="last_names"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="Perez"
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                        Fecha de nacimiento:
                                    </label>
                                    <input
                                        type="date"
                                        name="birthday"
                                        id="birthday"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="last_names" className="block text-sm font-medium text-gray-700">
                                        Genero:
                                    </label>

                                    <div class="flex justify-center mt-1">
                                        <input class="hidden" type="radio" id="male" value="male" name="gender" />
                                        <label class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-l" for="male">Hombre</label>

                                        <input class="hidden" type="radio" id="female" value="female" name="gender" />
                                        <label class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer" for="female">Mujer</label>
                                        
                                        <input class="hidden" type="radio" id="non-binary" value="non-binary" name="gender" />
                                        <label class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-r" for="non-binary">No Binario</label>
                                    </div>
                                </div>
                                
                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                                        Correo:
                                    </label>
                                    <input
                                        type="text"
                                        name="email_address"
                                        id="email_address"
                                        autoComplete="email"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="correo@dominio.com"
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Contraseña:
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="email"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Telefono:
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="0000000000"
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                                        Lugar de residencia:
                                    </label>
                                    <input
                                        type="text"
                                        name="place"
                                        id="place"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="ciudad - codigo postal"
                                    />
                                </div>
                                
                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="certificado" className="block text-sm font-medium text-gray-700">
                                        Certificado:
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="certificado"
                                        id="certificado"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                    />
                                </div>

                                <hr className="mt-3" />
                                <h2>Cuestionario:</h2>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="q1" className="block text-sm font-medium text-gray-700">
                                        Pregunta 1:
                                    </label>
                                    <input
                                        type="text"
                                        name="cuestionario[]"
                                        id="q1"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="Respuesta 1"
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="q2" className="block text-sm font-medium text-gray-700">
                                        Pregunta 2:
                                    </label>
                                    <input
                                        type="text"
                                        name="cuestionario[]"
                                        id="q2"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="Respuesta 2"
                                    />
                                </div>

                                <div className="w-full mx-auto mt-3">
                                    <label htmlFor="q3" className="block text-sm font-medium text-gray-700">
                                        Pregunta 3:
                                    </label>
                                    <input
                                        type="text"
                                        name="cuestionario[]"
                                        id="q3"
                                        className="mt-1 p-1.5 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                                        placeholder="Respuesta 3"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="w-full md:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                            Registro
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="mt-3 text-center">
                <Link to="/Signin">Registro de receptor</Link>
                <p>¿Ya tienes una cuenta? <Link to="/Login">Inicia sesión aquí</Link></p>
            </div>
        </div>
    );
}

export default SigninDonor;