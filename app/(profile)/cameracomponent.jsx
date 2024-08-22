
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function CameraComponent() {
    let cameraRef = useRef();
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState();

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current?.takePictureAsync(options);
        console.log(newPhoto.uri);

        setPhoto(newPhoto);
        router.push({
            pathname: 'verification',
            params: { photoUri: photo.uri },
        });
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.flipIcon]} onPress={toggleCameraFacing}>
                        <MaterialIcons
                            name='flip-camera-ios'
                            size={40}
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePic}>
                        <MaterialIcons
                            name='camera'
                            size={40}
                            style={styles.buttonIcon}
                        />
                        <Text style={styles.text}>Take Photo</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'center'
    },
    flipIcon: {
        position: 'absolute',
        left: 5
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    buttonIcon: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.19)',
        borderRadius: 50,
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
