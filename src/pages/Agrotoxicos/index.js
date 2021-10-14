import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text, Button } from 'react-native';

import api from '../../services/api'




function ListItem({ data }) {
    return (
        <View style={styles.diagnostico}>
            <Text>{data.NOMECOMUM}</Text>
            <TouchableOpacity >
                <Text style={{ backgroundColor: '#008c7a', padding: 5, borderRadius: 10, color: '#fff' }}>Selecione</Text>
            </TouchableOpacity>
        </View>
    )
}

export default function Agrotoxicos({ route }) {

    const [data, setData] = useState([])
    const [total, settotal] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setpage] = useState(1)

    useEffect(() => {
        ListDiag()
        console.log(page)
        count()
    }, [])
    const ListDiag = async () => {
        try {
            console.log(page)

            const response = await api.get(`http://localhost:8055/custom/gestao/diagnosticos/consulta/aplicativo/${route.params.data.IDCULTURA}/${page}`)
            setData(response.data)
            setpage(page + 1)
            console.log(page)

            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const ListDiagAnterior = async () => {
        try {
            console.log(route.params.data, 'aqui ó')
            setpage(page - 1)
            const response = await api.get(`http://localhost:8055/custom/gestao/diagnosticos/consulta/aplicativo/${route.params.data.IDCULTURA}/${page}`)
            setData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const count = async () => {
        try {
            const response = await api.get(`http://localhost:8055/custom/gestao/diagnosticos/consulta/aplicativo/total/${route.params.data.IDCULTURA}/${page}`)
            const perPage = Math.ceil(response.data[0].total / 10)
            settotal(perPage)
            console.log(response.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={loading === false ? styles.container : styles.loading} >
            <Text style={styles.title}>Doenças que atingem a cultura de {route.params.data.NOME}</Text>
            <FlatList
                data={data}
                keyExtractor={item => String(item.IDPROBLEMA)}
                renderItem={({ item }) => <ListItem data={item} />}
            />
            <View style={styles.buttons}>
                <Button
                    title='<< Anterior'
                    color="#17a2b8"
                    onPress={() => ListDiagAnterior()}
                    disabled={page === 1 ? true : false}
                />
                <Button
                    title='Próximo >>'
                    color="#17a2b8"
                    onPress={() => ListDiag()}
                    disabled={page == total ? true : false}
                />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008c7a',
        alignItems: 'center',
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#dcdcdc',
        padding: 5,
        borderRadius: 10,

    },
    diagnostico: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#dcdcdc',
        padding: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
})