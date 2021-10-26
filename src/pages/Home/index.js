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
              {loading === true &&
                <ActivityIndicator hidesWhenStopped={loading} size={50}
                 color='#f28705' animating={loading} style={{ position: 'absolute'}} />
                }
            <Text style={styles.title}>Atualizações da semana</Text>

            <ScrollView  showsVerticalScrollIndicator={false} style={styles.scroll}>
              
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
        <View style={{alignItems:'center'}}>
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
        width: '90%',
        height: 'auto',
        backgroundColor: '#fff',
        color: '#f28705',
        padding: 5,
        alignItems: 'center',
        opacity: 0.9,
        borderRadius: 10


    },
    testeData: {
        width: '100%',
        height: 40,
        backgroundColor: '#008c7a',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        opacity: 0.9

    },
    scroll: {
        backgroundColor: '#008c7a'
    },
    principal: {
        width: '100%',
        height: 200,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900',
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10

    },
    subTitle: {
        padding: 5,
        textAlign: 'center',
        color: '#ef8e18e0',
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
        color: '#000',
        marginLeft: 20,
        marginRight: 15,

    },
    porTras: {
        width: '98%',
        height: 'auto',
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 5,
        marginLeft: 1,

    },
    loading: {
        flex: 1,
        backgroundColor: '#008c7a',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.1
    },
})