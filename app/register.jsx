import React, { useRef, useState } from 'react';
import { useMutation } from "react-query";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './components/CustomButton';
import InputField from './components/InputField';
import { router } from "expo-router";
import { registerUser } from '@/lib/Fetcher';

const Register = () => {
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({})

    const formValid = (name, phone, email, password, confirmPassword) => {
        let errors = {}
        if (!name) errors.name = 'Name is required'
        if (!email) errors.email = 'Email is required'
        if (!phone) {
            errors.phone = 'Phone number is required'
        } else if (phone.length < 11) {
            errors.phone = 'Phone number must be at least 12 characters.';
        }
        if (!password) {
            errors.password = 'Password is required'
        } else if (phone.password < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }
        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required'
        } else if (password != confirmPassword) {
            errors.confirmPassword = 'Password do not match';
        }
        setErrors(errors);
        return Object.keys(errors).length == 0
    }

    const handleRegister = () => {
        let name = nameRef.current?.getValue()
        let phone = phoneRef.current?.getValue()
        let email = emailRef.current?.getValue()
        let password = passwordRef.current?.getValue()
        let confirmPassword = confirmPasswordRef.current?.getValue()
        if (formValid(name, phone, email, password, confirmPassword)) {
            create.mutate({ name, phone, email, password })

        } else {
            Alert.alert('Registration Failed', 'Please check the form for errors.');
        }
    };

    const create = useMutation(async data => registerUser(data), {
        onError: async (e) => {
            console.log(e);
        },
        onSuccess: async user => {
            router.push('/login')
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
                    Register
                </Text>

                <InputField
                    label={'Name'}
                    icon={
                        <MaterialIcons
                            name="person"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType='default'
                    ref={nameRef}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}


                <InputField
                    label={'Phone No.'}
                    icon={
                        <MaterialIcons
                            name="phone"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType='numeric'
                    ref={phoneRef}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                <InputField
                    label={'Email'}
                    icon={
                        <MaterialIcons
                            name="email"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
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
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
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

                <InputField
                    label={'Confirm Password'}
                    icon={
                        <MaterialIcons
                            name="lock"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                    secureTextEntry={true}
                    ref={confirmPasswordRef}
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}



                <CustomButton label={"Register"} onPress={handleRegister} />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>Already have an account ?</Text>
                    <TouchableOpacity onPress={() => router.push('login')}>
                        <Text style={{ color: '#6d25e5', fontWeight: '700' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;