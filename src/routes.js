import React from 'react'
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs'

import Home from './pages/Home'
import agrot from './pages/Compendio'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Diagnosticos from './pages/Diagnosticos'
import Agrotoxicos from './pages/Agrotoxicos'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const top = createMaterialTopTabNavigator()



function Routes() {
    return (
        <top.Navigator  
        screenOptions={{
            tabBarLabelStyle: { fontSize: 15, color: '#fff' },
            tabBarStyle: { backgroundColor: '#008c7a'},
            tabBarActiveTintColor: '#fff',
            tabBarIndicatorStyle:{ backgroundColor: '#fff'}
          }}

        >
            <top.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={!focused ? 'home-outline' : 'home'}
                            color={color}
                            size={25}
                        />
                    )
                }} />

            <top.Screen
                name="agrot"
                component={agrot}
                options={{
                    title:"pesquisa",
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={!focused ? 'magnify' : 'magnify'}
                            color={color}
                            size={25}
                        />
                    )
                }} />
            <top.Screen
                name="Perfil"
                component={Profile}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'account' : 'account-outline'}
                            color={color}
                            size={25}
                        />
                    )
                }} />

        </top.Navigator>

    )
}
function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle:{backgroundColor: '#008c7a',borderBottomColor:'transparent'},
                headerTransparent:true
            }}
        >
            <Stack.Screen initialRouteName="Login" name="Login" component={Login} />
            <Stack.Screen name="Consultas" component={Routes} />
            <Stack.Screen name="Diagnosticos" component={Diagnosticos} />
            <Stack.Screen name="Agrotoxicos" component={Agrotoxicos} />
        </Stack.Navigator>
    );
}

export default MyStack