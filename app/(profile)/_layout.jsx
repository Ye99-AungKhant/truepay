import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileIndex from './index';
import Verification from './verification';

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
        </Stack.Navigator>
    )
}

export default ProfileLayout