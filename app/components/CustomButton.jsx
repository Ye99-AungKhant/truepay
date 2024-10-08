import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CustomButton({ label, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: '#6d25e5',
                padding: 10,
                borderRadius: 10,
                marginVertical: 30,
            }}>
            <Text
                style={{
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 16,
                    color: '#fff',
                }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}