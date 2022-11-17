import React from 'react';
import { StyleSheet, TouchableOpacity, Text,View } from 'react-native';

export default function FlatButton({text, onPress}){
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius:3,
        paddingVertical:14,
        marginBottom:10,
        marginTop:10,
        height:44,
        width:300,
        paddingHorizontal:10,
        backgroundColor:'#009882',
    },
    buttonText:{
        color:'#FFF',
        fontWeight:'bold',
        textTransform: 'uppercase',
        fontSize: 14,
        textAlign:'center'
    }
});