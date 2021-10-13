import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text, Button } from 'react-native';

import api from '../../services/api'




function ListItem({data}){
    return(
        <View style={styles.agrotoxicoView}>
            <TouchableOpacity style={styles.diagnostico}>
                <Text>{data.NOMECOMUM}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default function Agrotoxicos({ route }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setpage] = useState(1)


    useEffect(() => {
        ListDiag()
    }, [])
    const ListDiag = async () => {
        try {
            console.log(route.params.data, 'aqui ó')
            const response = await api.get(`http://localhost:8055/custom/gestao/diagnosticos/consulta/aplicativo/${route.params.data.IDCULTURA}/${page}`)
            setData(response.data)
            setpage(page + 1)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={loading === false ? styles.container : styles.loading} >
            <Text style={styles.title}>Doenças que atingem a cultura de {route.params.data.NOME}</Text>
            <FlatList
                style={{ marginTop: 10 }}
                contentContainerStyle={{marginHorizontal:20}}
                data={data}
                keyExtractor={item => String(item.IDCULTURA)}
                renderItem={ ({item}) => <ListItem data={item}/> }
            />
            <View style={styles.buttons}>
                <Button
                    title='Anterior <<'
                    color="#17a2b8"
                />
                    <Button
                    title='Próximo >>'
                    color="#17a2b8"
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

    agrotoxicoView: {
        width: '100%',
        height: 45,
        backgroundColor: '#dcdcdc',
        padding: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
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
    buttons:{
        flexDirection: 'row',
        margin:0
    }
})