import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("token")) || null
    );
		const [type, setType] = useState(
			JSON.parse(localStorage.getItem("typeUser")) || null
		)
    useEffect(() => {
        localStorage.setItem("token", JSON.stringify(user))    
    },[user])

    const contexValue = {
        user,
				type,
        login(token, typeUser) {
            setUser({
                token
            });
						setType({
								typeUser
						})
        },
        logout() {
            setUser(null);
						setType(null);
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
