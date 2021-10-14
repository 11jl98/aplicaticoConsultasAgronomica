import React, { Component, useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import api from '../../services/api'



export default function Compendio({navigation}) {



    const [inputText, setInput] = useState("")
    const [data, setData] = useState([])

   
    const  listCultura = async (text) => {
        try {
            const response = await api.get(`items/culturas?filter[NOME][_eq]=${text}`)
            setData(response.data.data)
            console.log(response)
            console.log('esse trem aqui',data)
        } catch (error) {
            console.log('erro aqui', error)
        }
    }

    const pageAgrotoxico = (dados) => {
        console.log('ta aquiii', dados)
        navigation.navigate("agrotoxicos", {data: dados });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pesquisa por Culturas</Text>
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Pesquisa"
                    value={inputText}
                    onChangeText={(texto) => setInput(texto)}
                />
                <TouchableOpacity style={styles.icon} onPress={() => listCultura(inputText)}>
                    <Ionicons name="search" color="#fff" size={25} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{width:'100%'}}>
            {data.map((e, key) => 
                <View key={key} style={styles.agrotoxicoView}>
                    <Text  style={styles.subTitle}>Nome</Text>
                    <Text>{e.NOME}</Text>
                    <Text style={styles.subTitle}>Nome ciêntifico</Text>
                    <Text >{e.NOMECIENTIFICO}</Text>
                    <Text  style={styles.subTitle}>Caracteristicas</Text>
                    <Text>{e.CARACTERISTICAS}</Text>
                    <Text  style={styles.subTitle}>Melhor epoca para plantio</Text>
                    <Text>{e.EPOCAPLANTIO}</Text>
                    <Text  style={styles.subTitle}>Melhor epoca para colheita</Text>
                    <Text>{e.EPOCACOLHEITA}</Text>
                    <Text  style={styles.subTitle}>Solo indicado</Text>
                    <Text>{e.SOLO}</Text>
                    <Text  style={styles.subTitle}>Indicados para tratar:</Text>
                    <TouchableOpacity  style={styles.inputAreaDiag} onPress={ () => pageAgrotoxico(e) }>
                    <Text>ABRA AQUI</Text>
                 </TouchableOpacity>

                </View>
            )}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008c7a',
        alignItems: 'center'
    },
    input: {
        width: '85%',
        height: 50,
        color: '#fff',
        padding: 10,
        fontSize: 18

    },
    listAgro:{
        width: '100%',
        height: 35,
        color: '#f28705',
        padding: 5,
        fontSize: 18,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inputArea: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: '#dcdcdc',
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,

    },
    inputAreaDiag: {
        width: '50%',
        height:40,
        backgroundColor: '#dcdcdc',
        borderRadius: 50,
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',

    },
    icon: {
        width: '15%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    agrotoxicoView: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        color: '#f28705',
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:10,
        padding:10,
        marginTop: 40,

    },
    title: {
        fontSize: 25,
        padding: 5,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900',
        fontSize: 35,
        fontWeight: 'bold'

    },
    subTitle: {
        padding: 5,
        textAlign: 'center',
        color: '#f28705',
        fontWeight: '900',
        textAlign: 'center',
        fontWeight: 'bold'
    },
})