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
import { Ionicons } from "@expo/vector-icons";
import ModalPopUp from './../components/ModalPopUp';
import OtpInput from './../components/OtpInput';


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

    const handleModal = () => {
        setVisible(!visible)
    }

    useEffect(() => {
        console.log(otp);

    }, [otp])

    return (
        <View style={styles.container}>
            <ModalPopUp visible={visible} >
                <View style={styles.transfercard}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Ionicons name="close" size={24} />
                        </TouchableOpacity>
                        <View >
                            <OtpInput
                                length={6}
                                onComplete={(otp) => {
                                    setOtp(otp);
                                }}
                            />
                        </View>

                    </View>

                </View>
            </ModalPopUp>
            <View style={styles.card}>
                <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1673448390930-86b73c866905?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.image} />
                <View style={styles.item}>
                    <Text>Ye Aung</Text>
                    <Text>(******7458)</Text>
                </View>
            </View>
            <View style={styles.transfercard}>
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    ref={amountInput}
                    value={amount}
                    onChangeText={setAmount}
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
        padding: 20,
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
        paddingVertical: 10,
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
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});