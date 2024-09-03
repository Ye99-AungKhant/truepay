import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

const InputField = forwardRef(({
    label,
    icon,
    inputType = 'text',
    keyboardType = 'default',
    secureTextEntry = false,
    fieldButtonFunction,
    fieldButtonIcon,
    ...rest
}, ref) => {
    const [text, setText] = useState(null);
    useImperativeHandle(ref, () => ({
        getValue: () => text,
    }));

    return (
        <View
            style={{
                flexDirection: 'row',
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingBottom: 5,
                marginBottom: 8,
            }}>
            {icon}
            {inputType == 'password' ? (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0 }}
                    secureTextEntry={secureTextEntry}
                    onChangeText={setText}
                    {...rest}
                />
            ) : (
                <TextInput
                    placeholder={label}
                    keyboardType={keyboardType}
                    style={{ flex: 1, paddingVertical: 0 }}
                    onChangeText={setText}
                    {...rest}
                />
            )}
            <TouchableOpacity onPress={fieldButtonFunction}>
                {fieldButtonIcon}
            </TouchableOpacity>
        </View>
    );
})

export default InputField