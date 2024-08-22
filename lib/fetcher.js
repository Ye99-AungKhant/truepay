import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env'

export async function registerUser(data) {
    const res = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(data),

    });
    if (res.ok) {
        console.log(res);

        // AsyncStorage.setItem('authToken',res.token)
        return res.json();
    }
    throw new Error("Error: Check Network Log");
}
