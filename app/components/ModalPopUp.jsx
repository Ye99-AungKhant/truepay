import { View, Text, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'

const ModalPopUp = ({ visible, children }) => {
    const [showModal, setShowModal] = useState(visible)
    useEffect(() => {
        toggleModal()
    }, [visible])
    const toggleModal = () => {
        if (visible) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }
    return (
        <Modal visible={showModal} transparent={true}>
            <View style={styles.content}>
                {children}
            </View>

        </Modal>
    )
}

export default ModalPopUp

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }
})