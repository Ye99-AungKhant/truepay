
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useContext } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { MainContext } from "../provider/AppProvider";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { imageDb } from './../../lib/FirebaseConfig';
import { v4 as uuid } from 'uuid';
import { async } from './../../lib/Fetcher';

export default function CameraComponent() {
    let cameraRef = useRef();
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState();
    const { frontIDImg, setFrontIDImg, backIDImg, setBackIDImg } = useContext(MainContext);
    const [loading, setLoading] = useState(false)


    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };
        setLoading(!loading)
        let newPhoto = await cameraRef.current?.takePictureAsync(options);
        console.log(newPhoto.uri);

        const firebaseUpload = async (img) => {
            const fileUrl = await fetch(img);
            const file = await fileUrl.blob();
            const fileName = file._data.blobId
            const imgRef = ref(imageDb, `truepay/tp_${fileName}`)
            const uploaded = await uploadBytes(imgRef, file)
            const newProfile = await getDownloadURL(uploaded.ref);
            return newProfile
        }

        if (frontIDImg) {
            let firebaseData = await firebaseUpload(newPhoto.uri)
            console.log('firebaseData front', firebaseData);
            setBackIDImg(firebaseData)
            setLoading(!loading)
            router.back()
        } else {
            let firebaseData = await firebaseUpload(newPhoto.uri)
            console.log('firebaseData back', firebaseData);
            setFrontIDImg(firebaseData)
            setLoading(!loading)
            router.back()
        }

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
            {loading && <View style={styles.loadingOverlay}><ActivityIndicator size="large" color="#6d25e5" /></View>}
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
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
