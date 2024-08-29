import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Modal,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ModalPopUp from './../components/ModalPopUp';
import OtpInput from './../components/OtpInput';
import { useLocalSearchParams } from "expo-router";
import { useGlobalSearchParams } from "expo-router";


const TransferAmount = () => {
    const toInput = useRef();
    const amountInput = useRef();
    const noteInput = useRef();
    const [available, setAvailable] = useState("12,543.74");
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState("");
    const [visible, setVisible] = useState(false)
    const [otp, setOtp] = useState('')
    const transferUser = useGlobalSearchParams()

    const handleModal = () => {
        setVisible(!visible)
    }

    useEffect(() => {
        console.log(otp);
        console.log('transferUser', transferUser);

    }, [otp])

    return (
        <View style={styles.container}>
            <ModalPopUp visible={visible} >
                <View style={styles.transfercard}>

                    <View style={styles.divider}>
                        <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Ionicons name="close" size={24} color='#ccc' />
                        </TouchableOpacity>
                        <Text style={[styles.modalHeader]}>Enter Password</Text>
                    </View>
                    <View style={[styles.divider, styles.modalBody]}>
                        <Text>Transfer to Ye Aung</Text>
                        <Text style={{ fontSize: 40 }}>{amount}</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <OtpInput
                            length={6}
                            onComplete={(otp) => {
                                setOtp(otp);
                            }}
                        />
                    </View>
                    <Text style={{ color: 'red', textAlign: 'center' }}>your password is wrong</Text>
                </View>
            </ModalPopUp>
            <View style={styles.card}>
                {transferUser.profile_url ?
                    <Image source={{ uri: transferUser.profile_url }} style={styles.image} />
                    : <FontAwesome name="user-circle" size={50} color="gray" />
                }

                <View style={styles.item}>
                    <Text>{transferUser.name}</Text>
                    <Text> ({transferUser.phone})</Text>
                </View>
            </View>
            <View style={styles.transfercard}>
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    ref={amountInput}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.inputDes}
                    onPress={() => {
                        setAmount(available);
                    }}>
                    <Text>Balance: </Text>
                    <Text style={styles.balance}>{available}</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Note"
                    ref={noteInput}
                    value={note}
                    onChangeText={setNote}
                />
                <TouchableOpacity style={styles.button} onPress={handleModal}>
                    <Text style={styles.buttonText}>Transfer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TransferAmount


const styles = StyleSheet.create({
    container: {
        gap: 15,
        padding: 10,
        marginTop: 10,
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#fefefe',
        padding: 10,
        flexDirection: 'row'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginBottom: 10
    },
    item: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    transfercard: {
        borderRadius: 10,
        backgroundColor: '#fefefe',
        padding: 10,
    },
    input: {
        flexGrow: 1,
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    inputDes: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    balance: {
        color: "#0e9ce2",
        textDecorationLine: "underline",
    },
    button: {
        marginTop: 20,
        alignItems: "center",
        padding: 15,
        backgroundColor: "#6d25e5",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "white",
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    modalHeader: {
        textAlign: 'center',
        marginBottom: 10
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center'
    }

});