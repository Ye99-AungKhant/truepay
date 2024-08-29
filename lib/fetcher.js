import AsyncStorage from '@react-native-async-storage/async-storage';
import { config } from './config'

export async function registerUser(data) {
    const res = await fetch(`${config.API_URL}/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),

    });
    if (res.ok) {
        return res.json();
    }
}

export async function logInUser(data) {
    const res = await fetch(`${config.API_URL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),

    });
    if (res.ok) {

        return res.json();
    }
}

export async function verifyUserData(data) {
    console.log(data);
    const res = await fetch(`${config.API_URL}/user/verify`, {
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

export async function getUserProfileData(data) {
    const res = await fetch(`${config.API_URL}/user/profile/${data}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        },
    });
    if (res.ok) {
        // data = await res.json()
        // console.log(data);
        return res.json()
    }
}

export async function updateUserProfile(data) {
    const res = await fetch(`${config.API_URL}/user/profile`, {
        method: "PATCH",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        // data = await res.json()
        // console.log(data);
        return res.json()
    }
    throw new Error("Error: Check Network Log");
}

export async function searchTransferPhone(data) {
    const res = await fetch(`${config.API_URL}/transfer/check/${data}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        },
    })
    if (res.ok) {
        return res.json()
    }
    throw new Error("Error: Check Network Log")
}

export async function transfer(data) {
    const res = await fetch(`${config.API_URL}/transfer`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (res.ok) {
        return res.json()
    }
    throw new Error("Error: Check Network Log")
}

const Fetcher = {
    registerUser,
    logInUser,
    verifyUserData,
    getUserProfileData,
    transfer
};

export default Fetcher