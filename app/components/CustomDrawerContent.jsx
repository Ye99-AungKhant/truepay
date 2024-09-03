import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { MainContext } from '../provider/AppProvider';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';

const CustomDrawerContent = (props) => {
    const { userData, verifiedData, logout } = useContext(MainContext)

    const handleLogout = async () => {
        logout()
        props.navigation.navigate('welcome')
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <DrawerContentScrollView {...props}
                contentContainerStyle={{ backgroundColor: '#6d25e5', }}
            >
                <View style={styles.container}>
                    {userData?.profile_url ?
                        <Image source={{ uri: userData?.profile_url }} style={styles.image} />
                        :
                        <FontAwesome name="user-circle" size={70} color="white" />
                    }

                    <Text style={{ color: '#fff' }}>{verifiedData?.gender == 'Male' && 'Mr. '}{verifiedData?.gender == 'Female' && 'Mrs. '}{userData?.name}</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <DrawerItemList {...props} />
                </View>

            </DrawerContentScrollView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.footerItem}>
                        <Ionicons name='log-out-outline' size={22} />
                        <Text style={{ marginLeft: 10 }}>Logout</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginBottom: 10
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})