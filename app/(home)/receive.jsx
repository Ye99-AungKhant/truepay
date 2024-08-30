import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { MainContext } from '../provider/AppProvider';


const Receive = () => {
    const { userData } = useContext(MainContext)
    const { phone, profile_url } = userData
    console.log('phone', phone);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.card}>
                <QRCode
                    value={phone}
                    logo={profile_url}
                    logoSize={40}
                    logoBorderRadius={40}
                    logoBackgroundColor='white'
                    size={150}
                />
            </View>
        </View>
    )
}

export default Receive

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fefefe',
        padding: 20,
    },
})