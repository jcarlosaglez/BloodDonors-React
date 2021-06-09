import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("token")) || null
    );

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(user))    
    },[user])

    const contexValue = {
        user,
        login(token) {
            setUser({
                token
            })
            console.log(user)
        },
        logout() {
            setUser(null);
        },
        isLogged() {
            return !!user;
        }
    }
    return(
        <AuthContext.Provider value={contexValue}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;