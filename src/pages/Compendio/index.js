import React, { Component, useState, useEffect } from 'react';
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import api from '../../services/api'



export default function Compendio({ navigation }) {



    const [inputText, setInput] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)



    const listCultura = async (text) => {
        try {
            setLoading(true)
            const response = await api.get(`items/culturas?filter[NOME][_eq]=${text}`)
            setData(response.data.data)
            setLoading(false)
            console.log(response.data.data)
            console.log('esse trem aqui', data)
        } catch (error) {
            console.log('erro aqui', error)
            setLoading(false)
        }
    }

    const pageDiag = (dados) => {
        console.log('ta aquiii', dados)
        navigation.navigate("Diagnosticos", { data: dados });
    }

    return (
        <View style={loading === false ? styles.container : styles.loading}>
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
            {loading === true &&
                <ActivityIndicator hidesWhenStopped={loading} size={50}
                    color='#f28705' animating={loading} style={{ position: 'absolute' }} />
            }
            <ScrollView
             style={{ width: '100%' }}
             showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    {data.map((e, key) =>
                        <View key={key} style={styles.culturasView}>
                            <View  style={styles.dadosCultura}>
                                <Text style={styles.subTitle}>Nome</Text>
                                <Text style={styles.textInfos}>{e.NOME}</Text>
                            </View>
                            <View  style={styles.dadosCultura}>
                                <Text style={styles.subTitle}>Nome ciêntifico</Text>
                                <Text style={styles.textInfos}>{e.NOMECIENTIFICO}</Text>
                            </View>
                            <View  style={styles.dadosCultura}>
                                <Text style={styles.subTitle}>Caracteristicas</Text>
                                <Text style={styles.textInfos}>{e.CARACTERISTICAS}</Text>
                            </View>
                            <View  style={styles.dadosCultura}>
                                <Text style={styles.subTitle}>Melhor época para plantio</Text>
                                <Text style={styles.textInfos}>{e.EPOCAPLANTIO}</Text>
                            </View>
                            <View  style={styles.dadosCultura}>
                                <Text style={styles.subTitle}>Melhor época para colheita</Text>
                                <Text style={styles.textInfos}>{e.EPOCACOLHEITA}</Text>
                            </View>
                            <View  style={styles.dadosCultura}>
                                <Text style={styles.subTitle}>Solo indicado</Text>
                                <Text style={styles.textInfos}>{e.SOLO}</Text>
                            </View>
                            <View  style={styles.dadosCultura}>
                                <Text style={styles.subTitle}>Indicados para tratar:</Text>
                                <TouchableOpacity style={styles.inputAreaDiag} onPress={() => pageDiag(e)}>
                                    <Text style={{ color: '#fff' }}>ABRA AQUI</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                </View>
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
    listAgro: {
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
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 15

    },
    inputAreaDiag: {
        width: '100%',
        height: 40,
        backgroundColor: '#17a2b8',
        borderRadius: 10,
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
    culturasView: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#008c7a',
        color: '#f28705',
        padding: 5,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 10
    },
    dadosCultura: {
        width: '90%',
        height: 'auto',
        backgroundColor: '#fff',
        color: '#f28705',
        padding: 5,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10,
        opacity: 0.9,
        borderRadius: 10
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900',
        fontSize: 35,
        fontWeight: 'bold'

    },
    subTitle: {
        padding: 5,
        textAlign: 'center',
        color: '#ef8e18e0',
        fontWeight: '900',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    loading: {
        flex: 1,
        backgroundColor: '#008c7a',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.1
    },
    textInfos: {
        color: '#323232',
        fontSize: 17

    }
})