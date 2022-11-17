import React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

export function InputField({ label, placeholder, onChangeText }) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{label}</Text>
            <TextInput style={styles.input}
                       placeholder={placeholder}
                       onChangeText={onChangeText}
                       selectTextOnFocus={true}
            />
        </View>
    )
}

export const PasswordField = ({ label, onChangeText }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{label}</Text>
        <TextInput 
          style={styles.input}
          placeholder={"•••••••"}
          onChangeText={onChangeText}
          selectTextOnFocus={true}
          secureTextEntry={true}
        />
      </View>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    input: {
        borderRadius: 6,
        color: '#697D95',
        width: 343,
        height: 44,
        paddingLeft: 6,
        backgroundColor: '#EFF2F5',
        marginBottom: 10,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 6,
    },
})