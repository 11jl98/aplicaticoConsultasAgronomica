import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
// import Api from './api'

export default function Home(){
    return(
        <View style={styles.container}>
            <Text style={styles.teste} >Pagina inicial</Text>
            <Image source={{ uri: "http://grupobms.com.br/assets/img/logoNav.png" }} style={{ width: 150, height: 150 }} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    teste:{
        color: '#694fad'
    }
    
})