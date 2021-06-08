import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);

    const contexValue = {
        user,
        login() {
            setUser({
                id:1, username: "luis50"
            })
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