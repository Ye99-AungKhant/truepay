import { createContext, useState } from 'react';

const MainContext = createContext(null);

const AppProvider = ({ children }) => {
    const [frontIDImg, setFrontIDImg] = useState(null)
    const [backIDImg, setBackIDImg] = useState(null)

    return (
        <MainContext.Provider value={{ frontIDImg, setFrontIDImg, backIDImg, setBackIDImg }}>
            {children}
        </MainContext.Provider>
    )
}

export { AppProvider, MainContext } 