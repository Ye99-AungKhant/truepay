import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useGlobalSearchParams } from 'expo-router'

const TransferSuccess = () => {
    const transferSuccessData = useGlobalSearchParams()
    const { authId, transferData, recipientData } = transferSuccessData
    const data = JSON.parse(transferData)
    const recipie = JSON.parse(recipientData)
    console.log('transferSuccessData', data);
    console.log('transferSuccessData recipie', recipie);
    console.log('authId', authId);


    const date = new Date(data.createdAt);
    const formattedDateTime = `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString('en-US')}`;
    console.log(formattedDateTime);

    const maskNumber = (number) => {
        const maskedSection = number.slice(0, -4).replace(/\d/g, '*');
        const lastFourDigits = number.slice(-4);
        return maskedSection + lastFourDigits;
    };

    const maskedPhoneNumber = maskNumber(recipie.phone)

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.success.header}>
                    <Ionicons name='checkmark-outline'
                        size={40} color='white'
                        style={styles.success.icon}
                    />
                    <Text>Transaction Success</Text>
                    <Text style={{ fontSize: 30 }}>{data.recipient_user_id == authId ? '+' : '-'}{data.amount.toLocaleString()} (ks)</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Transaction Date</Text>
                    <Text>{formattedDateTime}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Transaction No.</Text>
                    <Text>{data.transactionId}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Transfer {data.sender_user_id == authId ? 'to' : 'from'}</Text>
                    <Text>{recipie.name} ({maskedPhoneNumber})</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Amount</Text>
                    <Text>{data.amount.toLocaleString()}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Note</Text>
                    <Text>{data?.note}</Text>
                </View>
            </View>
        </View>
    )
}

export default TransferSuccess

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fefefe',
        padding: 5,
    },
    item: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        color: 'gray',
    },
    success: {
        header: { alignItems: 'center' },
        icon: {
            backgroundColor: 'green',
            borderRadius: 20,
        }
    }
})