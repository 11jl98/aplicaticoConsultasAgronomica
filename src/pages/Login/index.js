import React, { Component, useState } from 'react';
import { Button, View, StyleSheet, TextInput, Image, Text, ActivityIndicator } from 'react-native';

import apiEmpresa from '../../services/apiEmpresa'

export default function Login({ navigation }) {

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


    const Logar = async () => {
        try {
            const data = {
                "login": login,
                "password": password
            }
            setLoading(true)

            const response = await apiEmpresa.post('/auth', data)
            console.log(response)
            setLoading(false)

            if (response.data.token) {
                navigation.navigate("home", { data: response.data.token })
            }

        } catch (error) {
            setLoading(false)
            alert('Usuario não encontrado')

        }
    }

    return (

        <View style={loading === false ? styles.container : styles.loading} >
            <Image style={styles.logo} source={require('../../assets/logoNav.png')} />
            <Text style={styles.subTitle}>Login</Text>
            <TextInput
                style={styles.inputLogin}
                value={login}
                onChangeText={(texto) => setLogin(texto)}
            />
            {loading === true &&
                <View style={styles.ViewLoading}>
                    <ActivityIndicator hidesWhenStopped={loading} size={50} color='#f28705' animating={loading} style={{position: 'absolute'}}/>
                </View>
            }
                    <Text style={styles.subTitle} >Senha</Text>
                    <TextInput
                        style={styles.inputPassword}
                        value={password}
                        onChangeText={(texto) => setPassword(texto)}
                        secureTextEntry={true}
                    />
                    <Button
                        title='Acessar'
                        color="#17a2b8"
                        style={styles.loginButton}
                        onPress={() => Logar()}
                    />
        </View>
    )

}

const styles = StyleSheet.create({
    inputLogin: {
        width: '85%',
        height: 50,
        color: '#000',
        padding: 10,
        fontSize: 18,
        paddingLeft: 20,
        opacity: 0.8,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10


    },
    inputPassword: {
        width: '85%',
        height: 50,
        color: '#000',
        padding: 10,
        fontSize: 18,
        paddingLeft: 20,
        opacity: 0.8,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10

    },
    logo: {
        width: 250,
        height: 100,
        // alignSelf: 'stretch',
        resizeMode: 'contain',
        marginLeft: 5,
        marginTop: 160,
        marginBottom: 15

    },
    container: {
        flex: 1,
        backgroundColor: '#008c7a',
        alignItems: 'center',
    },
    subTitle: {
        padding: 5,
        textAlign: 'center',
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    loginButton: {
        width: '85%',
        height: 50,
        color: '#fff',
        borderRadius: 10,

    },
    loading: {
        flex: 1,
        backgroundColor: '#008c7a',
        alignItems: 'center',
        opacity: 0.3
    },
    ViewLoading:{
        alignItems: 'center',
        
    }
})
