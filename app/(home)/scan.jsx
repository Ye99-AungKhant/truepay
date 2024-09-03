import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useQuery } from "react-query";
import { searchTransferPhone } from "@/lib/Fetcher";

export default function Scan() {
    const [facing, setFacing] = useState("back");
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(null);
    if (!permission) {
        return <View />;
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                    We need your permission to show the camera
                </Text>
                <View
                    style={{ marginTop: 20, width: 250, alignSelf: "center" }}>
                    <Button
                        onPress={requestPermission}
                        title="grant permission"
                    />
                </View>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === "back" ? "front" : "back"));
    }

    const handleQrCode = async ({ type, data }) => {
        setScanned(data);
        const scantransfer = await searchTransferPhone(data)
        console.log('scantransfer', scantransfer)
        router.push({ pathname: `/(home)/transferamount`, params: scantransfer })

    }


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={scanned ? null : handleQrCode}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraFacing}>
                        <MaterialIcons
                            name="cameraswitch"
                            size={48}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
});           