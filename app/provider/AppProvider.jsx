import { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const MainContext = createContext(null);

const AppProvider = ({ children }) => {
    const [frontIDImg, setFrontIDImg] = useState(null)
    const [backIDImg, setBackIDImg] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState({
        id: null,
        name: null,
        phone: null,
        email: null,
        status: null,
        profile_url: null,
        balance: 0,
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

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                setIsAuthenticated(!!token);
                if (!token) {
                    return router.push('/welcome')
                }
            } catch (error) {
                console.error('Error fetching auth token', error);
            }
        };

        checkAuthToken();
    }, []);

    const login = async (token) => {
        try {
            await AsyncStorage.setItem('authToken', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error storing auth token', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            const token = await AsyncStorage.get('authToken')
            setIsAuthenticated(false);
            console.log('logout', token);

        } catch (error) {
            console.error('Error removing auth token', error);
        }
    };

    return (
        <MainContext.Provider value={{ userData, setUserData, verifiedData, setVerifiedData, frontIDImg, setFrontIDImg, backIDImg, setBackIDImg, isAuthenticated, setIsAuthenticated, login, logout }}>
            {children}
        </MainContext.Provider>
    )
}

export { AppProvider, MainContext } 