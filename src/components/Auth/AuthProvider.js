import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const url = ["https://api-blood-donors-v2.herokuapp.com/", ""];
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("token")) || null
    );
    const [type, setType] = useState(
        JSON.parse(localStorage.getItem("typeUser")) || null
    )
    const [email, setEmail] = useState(
        JSON.parse(localStorage.getItem("emailUser")) || null
    )
    useEffect(() => {
        localStorage.setItem("token", JSON.stringify({user, type}));
    },[type, user])
    const contexValue = {
        url,
        user,
        email,
		type,
        login(token, emailT, typeUser) {
            setType({
                typeUser
            });
            setEmail(
                emailT
            );
            setUser({
                token
            });
        },
        logout() {
            setUser(null);
			setType(null);
            setEmail(null);
        },
        isLogged() {
            if(user !== null && user.type !== null ){
                return true
            } else {
                return false
            }
        }
    }
    return(
        <AuthContext.Provider value={contexValue}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
