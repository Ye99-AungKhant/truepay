import { createContext, useState } from 'react';

const MainContext = createContext(null);

const AppProvider = ({ children }) => {
    const [frontIDImg, setFrontIDImg] = useState(null)
    const [backIDImg, setBackIDImg] = useState(null)
    const [userData, setUserData] = useState({
        id: null,
        name: null,
        phone: null,
        email: null,
        status: null,
        profile_url: null,
    });
    const [verifiedData, setVerifiedData] = useState({
        id_type: null,
        id_no: null,
        country: null,
        city: null,
        postal_code: null,
        dob: null,
        gender: null,
    })

    return (
        <MainContext.Provider value={{ userData, setUserData, verifiedData, setVerifiedData, frontIDImg, setFrontIDImg, backIDImg, setBackIDImg }}>
            {children}
        </MainContext.Provider>
    )
}

export { AppProvider, MainContext } 