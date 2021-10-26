import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../../services/api'
import { Ionicons } from '@expo/vector-icons'
import { Transition, Transitioning } from 'react-native-reanimated'


function Transitions() {
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Change />
        <transition.Out type='fade' durationMs={200} />
    </Transition.Together>
}

function ListItemAgro({ data }) {


    return (
        <View style={styles.listDados}>
            <Text>Registro</Text>
            <Text>{data.REGISTRO}</Text>
            <Text>Aplicação</Text>
            <Text>{data.APLICACAO}</Text>
        </View>
    )
}

function ListItem({ data, index }) {
    const [currentIndex, setIndex] = useState(null)
    const [dataAgrot, setDataAgrot] = useState([])
    const [arrow, setArrow] = useState("arrow-down")
    const ref = useRef()

    const AgrotoxicosCompleto = async () => {
        try {
            ref.current.animateNextTransition()
            setIndex(index === currentIndex ? null : index)
            setArrow(index === currentIndex ? "arrow-down" : "arrow-up")
            console.log(index)
            const response = await api.get(`items/agrotoxicos?filter[IDAGROTOXICO][_eq]=${data.IDAGROTOXICO}`)
            setDataAgrot(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Transitioning.View
            transition={Transitions}
            ref={ref}
            style={styles.agrotoxicos}>
            <TouchableOpacity style={styles.colapseContainer} onPress={() => { AgrotoxicosCompleto() }}>
                <Text>{data.NOMECOMUM}</Text>
                <Ionicons name={arrow} size={15} style={{ backgroundColor: 'transparent', margin: 5, borderRadius: 10, color: '#008c7a' }}></Ionicons>
            </TouchableOpacity>
            {index === currentIndex && (
                <View style={styles.listDados} >
                    <FlatList
                        data={dataAgrot}
                        keyExtractor={item => String(item.IDAGROTOXICO)}
                        renderItem={({ item }) => <ListItemAgro data={item} index={currentIndex} />}
                    />
                </View>
            )}
        </Transitioning.View>
    )
}

export default function Agrotoxicos({ route, navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        console.log(page)
        listAgro()
        setTotal(count())
    }, [])

    useEffect(() => {
        listAgro()
    }, [page])

    const listAgro = async () => {
        try {
            const response = await api.get(`/custom/gestao/agrotoxicos/consulta/aplicativo/${route.params.IDCULTURA}/${route.params.IDPROBLEMA}/${page}`)
            console.log(page)
            setData(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const count = async () => {
        try {
            const response = await api.get(`/custom/gestao/agrotoxicos/consulta/aplicativo/total/agrot/${route.params.IDCULTURA}/${route.params.IDPROBLEMA}`)
            const perPage = Math.ceil(response.data[0].total / 10)
            settotal(perPage)
            console.log(response.data[0].total)
            return perPage
        } catch (error) {
            console.log(error)
        }
    }

    const pageBack = () => {
        navigation.goBack()
    }

    return (
        <View
            style={loading === false ? styles.container : styles.loading}
        >
            <TouchableOpacity style={{ marginLeft: 10, marginTop: 10, alignSelf: 'flex-start' }} onPress={() => { pageBack() }} >
                <Ionicons name="arrow-back" color="#fff" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>Agrotoxicos para tratar {route.params.NOMECOMUM}</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={data}
                    keyExtractor={item => String(item.IDAGROTOXICO)}
                    renderItem={({ item, index }) => <ListItem data={item} index={index} />}
                />
            </ScrollView>
            {total >= 2 &&(

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.buttonsPaginate}
                    onPress={() => setPage(page-1)}
                    disabled={page - 1 === 1 ? true : false}>
                    <Ionicons name="arrow-back" size={15} color="#fff" style={{ margin: 2 }}></Ionicons>
                </TouchableOpacity>

                <Text style={{ backgroundColor: '#17a2b8', padding: 5, color: '#fff', borderRadius: 10 }}>Pagina: {page}</Text>
                <TouchableOpacity
                    style={styles.buttonsPaginate}
                    onPress={() => setPage(page+1)}
                    disabled={page === total ? true : false}>
                    <Ionicons name="arrow-forward" size={15} color="#fff" style={{ margin: 2 }}></Ionicons>
                </TouchableOpacity>
            </View>
            )}
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
    Nottitle: {
        fontSize: 15,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900',
        marginTop: 10,
        marginBottom: 50,
        opacity: 0.9
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
    colapseContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    agrotoxicos: {
        width: 400,
        height: 'auto',
        backgroundColor: '#fff',
        padding: 5,
        marginTop: 5,
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: 0.9,
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

})