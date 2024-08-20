import React from 'react'
import { Image, View, SafeAreaView, StyleSheet, Text } from 'react-native'
import CustomButton from './components/CustomButton'
import { router } from "expo-router";

const Welcome = () => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <Image style={styles.welcome} source={require('../assets/images/welcome.png')} />

                <View>
                    <Text style={styles.title}>True Pay</Text>
                    <Text style={styles.puchline}>Trust Digitall Wallet</Text>
                </View>
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
        width: 300,
        height: 300
    },
    title: {
        color: '#6d25e5',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    puchline: {
        textAlign: 'center',
        paddingHorizontal: 10,
        fontSize: 18,
        color: '#6d25e5',
    }
})