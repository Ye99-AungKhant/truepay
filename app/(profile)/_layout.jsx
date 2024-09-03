import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileIndex from './index';
import Verification from './verification';
import CameraComponent from './cameracomponent';
import ProfileUpdate from './profileupdate';

const ProfileLayout = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="index"
                component={ProfileIndex}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="verification"
                component={Verification}
                options={{ headerTitle: 'Verification' }}
            />
            <Stack.Screen
                name="profileupdate"
                component={ProfileUpdate}
                options={{ headerTitle: 'Profile' }}
            />
            <Stack.Screen
                name="cameracomponent"
                component={CameraComponent}
                options={{ headerTitle: 'CameraComponent' }}
            />
        </Stack.Navigator>
    )
}

export default ProfileLayout