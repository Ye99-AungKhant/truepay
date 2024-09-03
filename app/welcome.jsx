import React, { useContext, useEffect } from 'react'
import { Image, View, SafeAreaView, StyleSheet, Text } from 'react-native'
import CustomButton from './components/CustomButton'
import { router } from "expo-router";

const Welcome = () => {

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                {/* <Image style={styles.welcome} source={require('../assets/images/welcome2.png')} /> */}
                <Text style={styles.title}>True Pay</Text>
                <Text style={styles.puchline}>Trust Digitall Wallet</Text>
                <View style={{ marginTop: 50 }}>
                    <CustomButton label={"Getting Started"} onPress={() => router.push('register')} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    welcome: {
        width: 50,
        height: 50
    },
    title: {
        color: '#6d25e5',
        fontSize: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    puchline: {
        textAlign: 'center',
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#6d25e5',
    }
})