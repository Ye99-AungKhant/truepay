import React from 'react';
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

const Register = () => {
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
                />

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
                    keyboardType="email-address"
                />

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
                    fieldButtonFunction={() => { }}
                />

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
                    fieldButtonFunction={() => { }}
                />

                <CustomButton label={"Register"} onPress={() => { }} />

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