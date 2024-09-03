import React, { useContext, useRef, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './components/CustomButton';
import InputField from './components/InputField';
import { router } from "expo-router";
import { useMutation } from 'react-query';
import { logInUser } from '@/lib/Fetcher';
import { useNavigation } from '@react-navigation/native';
import { MainContext } from './provider/AppProvider';
import { usePushNotifications } from '@/usePushNotifications';

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [errors, setErrors] = useState({})
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigation = useNavigation();
    const { login } = useContext(MainContext)
    const { expoPushToken } = usePushNotifications();
    const expopushToken = expoPushToken?.data

    const formValid = (email, password,) => {
        let errors = {}
        if (!email) errors.email = 'Email is required'
        if (!password) {
            errors.password = 'Password is required'
        } else if (password.length != 6) {
            errors.password = 'Password must be 6 digit.';
        }
        setErrors(errors);
        return Object.keys(errors).length == 0
    }

    const handleLogin = () => {
        let email = emailRef.current?.getValue()
        let password = passwordRef.current?.getValue()
        const valid = email && password
        if (formValid(email, password)) {
            create.mutate({ email, password, expoPushToken: expopushToken })

        } else {
            Alert.alert('Login Failed', 'Please check the form for errors.');
        }
    };

    const create = useMutation(async data => logInUser(data), {
        onError: async (e) => {
            setErrors({ credentialError: 'Your credentials do not match' })
        },
        onSuccess: async (data) => {
            console.log('login', data);
            login(data)
        },
    });

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    Login
                </Text>

                <InputField
                    label={'Email'}
                    icon={
                        <MaterialIcons
                            name="email"
                            size={20}
                            color="#666"
                            style={{ margin: 5 }}
                        />
                    }
                    ref={emailRef}
                    keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <InputField
                    label={'Password'}
                    icon={
                        <MaterialIcons
                            name="lock"
                            size={20}
                            color="#666"
                            style={{ margin: 5 }}
                        />
                    }
                    inputType="password"
                    keyboardType="numeric"
                    secureTextEntry={!passwordVisible}
                    ref={passwordRef}
                    fieldButtonFunction={() => setPasswordVisible(!passwordVisible)}
                    fieldButtonIcon={
                        <MaterialIcons
                            name={passwordVisible ? 'visibility' : 'visibility-off'}
                            size={20}
                            color="#666"
                        />
                    }
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                {errors.credentialError && <Text style={styles.errorText}>{errors.credentialError}</Text>}

                <CustomButton label={create.isLoading ? <ActivityIndicator size="small" color="white" /> : 'Login'} onPress={handleLogin} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>New to the app?</Text>
                    <TouchableOpacity onPress={() => router.push('register')}>
                        <Text style={{ color: '#6d25e5', fontWeight: '700' }}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    errorText: {
        color: 'red'
    }
})