import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from './config'

export async function registerUser(data) {
    const res = await fetch(`${config.API_DEV_URL}/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),

    });
    if (res.ok) {
        const data = await res.json();
        AsyncStorage.setItem('authToken', data)
        return JSON.stringify(data);
    }
}

export async function logInUser(data) {
    const res = await fetch(`${config.API_DEV_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),

    });
    if (res.ok) {
        const data = await res.json();
        AsyncStorage.setItem('authToken', data)
        return JSON.stringify(data);
    }
}

export async function verifyUserData(data) {
    console.log(data);
    const res = await fetch(`${config.API_DEV_URL}/user/verify`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),

    });
    if (res.ok) {
        console.log(res);
        return res.json();
    }
    throw new Error("Error: Check Network Log");
}

const Fetcher = {
    registerUser,
    verifyUserData,
};

export default Fetcher