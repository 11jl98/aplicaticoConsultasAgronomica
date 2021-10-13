import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';

import api from '../../services/api'

export default function Home() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        console.log('aquiiiiiiiiiiiiiiiii')
        listAtualizacao()

    }, [])

    const listAtualizacao = async () => {
        try {
            setLoading(true)
            const response = await api.get('/items/relatatualizacao?filter[DATA][_gt]=2021-08-01?&fields[]=IDRELATATUALIZACAO&fields[]=DATA&fields[]=TEXTOATUALIZACAO')
            setData(response.data.data)
            setLoading(false)

        }
        catch (err) {
            setLoading(false)
            console.error(err);
        }
    }
    return (
        
        <View style={loading === false ? styles.container : styles.loading} >
            <Text style={styles.title}>Atualizações da semana</Text>
            {loading === true &&
                <View style={{ alignItems: 'center', justifyContent:'center' }}>
                    <ActivityIndicator hidesWhenStopped={loading} size={50} color='#f28705' animating={loading} style={{ position: 'absolute', marginTop: 200}} />
                </View>
            }
            <ScrollView style={styles.scroll}>
                <FlatList
                    data={data}
                    keyExtractor={item => String(item.IDRELATATUALIZACAO)}
                    renderItem={({ item }) => <ListItem data={item} />}
                />
            </ScrollView>

        </View>
    );
}

function ListItem({ data }) {
    return (
        <View style={{ marginTop: 5 }}>
            <View style={styles.testeData}>
                <Text style={styles.primary}>{data.DATA.split('-').reverse().join('/')}</Text>
            </View>
            <View style={styles.teste}>
                <Text style={styles.subTitle}>DADOS DA ATUALIZAÇÃO</Text>
                <Text style={styles.secondary}>{data.TEXTOATUALIZACAO}</Text>
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
    logo: {
        width: '100%',
        height: 150,
        // alignSelf: 'stretch',
        resizeMode: 'contain',
        marginLeft: 5
    },
    teste: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        color: '#f28705',
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.53,
        shadowRadius: 10,
        elevation: 21,
        borderRadius: 10,
        alignItems: 'center',


    },
    testeData: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#008c7a',
        padding: 5,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.53,
        shadowRadius: 10,
        elevation: 21,
        borderRadius: 10,
        marginBottom: 5


    },
    scroll: {
        backgroundColor: '#fff'
    },
    principal: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

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
    linha: {
        width: '97%',
        height: 2,
        backgroundColor: '#f28705',
        margin: 7
    },
    primary: {
        fontWeight: '500',
        color: '#fff',
        fontWeight: 'bold'

    },
    secondary: {
        fontWeight: '500',
        color: '#000'

    },
    porTras: {
        width: '98%',
        height: 'auto',
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 5,
        marginLeft: 1

    },
    loading: {
        flex: 1,
        backgroundColor: '#008c7a',
        alignItems: 'center',
        opacity: 0.5
    },
})