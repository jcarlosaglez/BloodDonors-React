import React from "react";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div className="mt-28 md:mt-16 md:w-3/12 sm:w-full mx-auto">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                    <div className="shadow overflow-hidden sm:rounded-md border">
                        <h1 className="mt-5 text-center text-2xl text-gray-700">Iniciar sesión</h1>

                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="">
                                <div className="w-full mx-auto">
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
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="w-full md:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                            Iniciar sesión
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="mt-3 text-center">
                <Link to="/Signin">Registrate aquí</Link>
            </div>
        </div>
    );
}

export default Login;