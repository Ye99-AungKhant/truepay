import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { MainContext } from '../provider/AppProvider';


const Receive = () => {
    const { userData } = useContext(MainContext)
    const { phone, profile_url } = userData
    console.log('phone', phone);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <QRCode
                    value={phone}
                    logo={profile_url}
                    logoSize={30}
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