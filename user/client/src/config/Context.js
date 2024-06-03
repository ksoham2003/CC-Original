import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({children}) => {

    const [loginInfo, setLoginInfo] = useState();

    return(
        <Context.Provider value={{
            loginInfo, setLoginInfo
        }}>
            {children}
        </Context.Provider>
    )
}
export default AppContext;