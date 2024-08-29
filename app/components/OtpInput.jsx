import React, { useRef, useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";

const OtpInput = ({ length = 6, onComplete }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));
    const inputs = useRef([]);

    const focusNext = (index) => {
        if (index < length - 1 && inputs.current[index + 1]) {
            inputs.current[index + 1].focus();
        }
    };

    const focusPrev = (index) => {
        if (index > 0 && inputs.current[index - 1]) {
            inputs.current[index - 1].focus();
        }
    };

    const handleChangeText = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text) {
            focusNext(index);
        }

        if (newOtp.every((val) => val !== "") && onComplete) {
            onComplete(newOtp.join(""));
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }, index) => {
        if (key === "Backspace" && !otp[index]) {
            focusPrev(index);
        }
    };

    return (
        <View style={styles.container}>
            {otp.map((value, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    style={[
                        styles.input,
                        { marginHorizontal: index !== 0 || index !== length - 1 ? 10 : 0 },
                        { borderBottomColor: value ? '#6d25e5' : '#000' }
                    ]}
                    keyboardType="numeric"
                    maxLength={1}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    value={value}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    input: {
        borderBottomWidth: 2,
        paddingBottom: 10,
        width: 40,
        textAlign: "center",
        fontSize: 20,
    },
});

export default OtpInput;