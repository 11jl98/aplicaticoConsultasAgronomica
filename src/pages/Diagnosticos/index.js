import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text, Button, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import api from '../../services/api'


function ListItemDiag({ data }) {
    return (
        <View style={styles.listDados}>
            <Text>teste</Text>
        </View>
    )
}


function ListItem({ data, navigation, index }) {

    const [currentIndex, setIndex] = useState(null)
    const [dataDiag, setDataDiag] = useState([])
    const [arrow, setArrow] = useState("arrow-down")
    const [page, setPage] = useState(1)


    const pageAgrotoxico = () => {
        navigation.navigate('Agrotoxicos', { IDCULTURA: data.IDCULTURA, IDPROBLEMA: data.IDPROBLEMA, NOMECOMUM: data.NOMECOMUM })
    }

    const infoDiag = async () => {
        try {
            setIndex(index === currentIndex ? null : index)
            setArrow(index === currentIndex ? "arrow-down" : "arrow-up")
            const response = await api.get(`custom/gestao/diagnosticos/consulta/aplicativo/${data.IDCULTURA}/${page}`)
            setDataDiag(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.diagnostico}>
            <TouchableOpacity style={styles.colapseContainer} onPress={() => infoDiag()}>
                <Text>{data.NOMECOMUM}</Text>
                <Ionicons name={arrow} size={15} style={{ backgroundColor: 'transparent', borderRadius: 10, color: '#008c7a' }}></Ionicons>
            </TouchableOpacity>

            {index === currentIndex && (
                <View style={styles.diagnostico} >
                    <FlatList
                        data={dataDiag}
                        keyExtractor={item => String(item.IDAGROTOXICO)}
                        renderItem={({ item }) => <ListItemDiag data={item} index={currentIndex} />}
                    />
                    <TouchableOpacity onPress={() => pageAgrotoxico()}>
                        <Text style={{width:'100%', backgroundColor: '#008c7a', padding: 5, borderRadius: 10, color: '#fff' }}>Selecione</Text>
                    </TouchableOpacity>
                </View>

            )}
        </View>
    )
}

export default function Diagnosticos({ route, navigation }) {

    const [data, setData] = useState([])
    const [total, settotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        ListDiag()
        count()
    }, [])

    useEffect(() => {
        ListDiag()
    }, [page])
    const ListDiag = async () => {
        try {
            console.log(page)
            setLoading(true)
            const response = await api.get(`custom/gestao/diagnosticos/consulta/aplicativo/${route.params.data.IDCULTURA}/${page}`)

            setData(response.data)

            setLoading(false)
            console.log(response.data)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const count = async () => {
        try {
            const response = await api.get(`custom/gestao/diagnosticos/consulta/aplicativo/total/${route.params.data.IDCULTURA}/${page}`)
            const perPage = Math.ceil(response.data[0].total / 10)
            settotal(perPage)
            console.log(response.data[0].total)
        } catch (error) {
            console.log(error)
        }
    }
    const pageBack = () => {
        navigation.goBack()
    }

    return (
        <View style={loading === false ? styles.container : styles.loading} >
            <TouchableOpacity style={{ marginLeft: 10, marginTop: 10, alignSelf: 'flex-start' }} onPress={() => pageBack()}>
                <Ionicons name="arrow-back" color="#fff" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>Doenças que atingem a cultura de {route.params.data.NOME}</Text>

            {loading === true &&
                <ActivityIndicator hidesWhenStopped={loading} size={50}
                    color='#ef8e18e0' animating={loading} style={{ position: 'absolute' }} />
            }
            <FlatList
                data={data}
                keyExtractor={item => String(item.IDPROBLEMA)}
                renderItem={({ item, index }) => <ListItem index={index} data={item} navigation={navigation} />}
            />
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.buttonsPaginate}
                    onPress={() => setPage(page - 1)}
                    disabled={page === 1 ? true : false}>
                    <Ionicons name="arrow-back" size={15} color="#fff" style={{ margin: 2 }}></Ionicons>

                </TouchableOpacity>

                <Text style={styles.paginas}>Pagina: {page}</Text>
                <TouchableOpacity
                    style={styles.buttonsPaginate}
                    onPress={() => setPage(page + 1)}
                    disabled={page === total ? true : false}>
                    <Ionicons name="arrow-forward" size={15} color="#fff" style={{ margin: 2 }}></Ionicons>
                </TouchableOpacity>

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
        fontSize: 15,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 50
    },
    subTitle: {
        padding: 5,
        textAlign: 'center',
        color: '#ef8e18e0',
        fontWeight: '900',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    listDados: {
        width: 400,
        height: 'auto',
        backgroundColor: 'transparent',
        padding: 5,
        marginTop: 5,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: 0.9,
    },
    buttons: {
        width: 400,
        height: 'auto',
        backgroundColor: 'transparent',
        padding: 5,
        marginTop: 5,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 100

    },
    diagnostico: {
        width: 400,
        height: 'auto',
        backgroundColor: '#fff',
        padding: 5,
        marginTop: 5,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'space-between',
        opacity: 0.9
    },

    colapseContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    loading: {
        flex: 1,
        backgroundColor: '#008c7a',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.1
    },
    buttonsPaginate: {
        width: 60,
        backgroundColor: '#ef8e18e0',
        alignItems: 'center',
        padding: 10,
        color: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        opacity: 0.9
    },
    paginas: {
        backgroundColor: '#17a2b8',
        padding: 5,
        color: '#fff',
        borderRadius: 10
    }

})