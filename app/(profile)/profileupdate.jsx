import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, StatusBar } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { imageDb } from './../../lib/FirebaseConfig';
import { useMutation, useQueryClient } from 'react-query';
// import { updateUserProfile } from '@/lib/Fetcher';
import { updateUserProfile } from '../../lib/Fetcher';
import { MainContext } from '../provider/AppProvider';

const ProfileUpdate = () => {

    const { userData, setUserData, verifiedData, setVerifiedData } = useContext(MainContext)
    const [image, setImage] = useState(userData.profile_url)
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient();
    console.log('userData', userData.name);
    console.log('profile_url', userData.profile_url);

    const { mutate } = useMutation(async (data) => {
        return await updateUserProfile(data);
    }, {
        onError: async (e) => {
            console.log(e);
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries(['userData'])
            setLoading(false)
        },
    });

    const pickImage = async () => {
        console.log('choose');

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const photo = result.assets[0].uri
            const fileName = result.assets[0].fileName

            setLoading(true)
            setImage(photo)
            const imgRef = ref(imageDb, `truepay/tp_${fileName}`)
            const fileUrl = await fetch(photo);
            const file = await fileUrl.blob();
            const uploaded = await uploadBytes(imgRef, file)
            const newProfile = await getDownloadURL(uploaded.ref);
            setImage(newProfile)
            mutate({ id: userData.id, profile_url: newProfile })
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.item}>
                <View style={styles.profileIcon}>
                    {image ? <Image source={{ uri: userData.profile_url }} style={styles.image} />
                        : <FontAwesome name="user-circle" size={100} color="gray" />}
                    {loading && <View style={styles.loadingOverlay}><ActivityIndicator size="large" color="#6d25e5" /></View>}
                    <TouchableOpacity onPress={pickImage}>
                        <View style={styles.chooseBtn}><FontAwesome name="plus-circle" size={30} color="gray" /></View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.item]}><Text>{verifiedData.gender == 'Male' ? 'Mr. ' : 'Mrs. '} {userData.name}</Text></View>
        </View>
    )

}

export default ProfileUpdate

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginBottom: 0,
        borderRadius: 10,
        backgroundColor: '#fefefe',
        paddingHorizontal: 10,
    },
    item: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileIcon: {
        position: 'relative',
    },
    chooseBtn: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: '#ccc',
        borderRadius: 50,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chooseIcon: {
        textAlign: 'center',
    },
    loadingOverlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
})