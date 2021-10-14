import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './pages/Home'
import agrot from './pages/Compendio'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Agrotoxicos from './pages/Agrotoxicos'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator()



function Routes() {
    return (
        <Tab.Navigator
        screenOptions= {{
            headerShown: false

        }}
            tabBarOptions={{
                activeTintColor: '#17a2b8',
                inactiveTintColor: '#fff',
                tabStyle: {
                    backgroundColor: '#008c7a',
                    color: '#17a2b8',
                    padding: 5,
                    borderTopColor: '008c7a',
                },
                style: {
                    borderTopColor: 'transparent',
                    padding: 5
                },
               

            }}
          
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={!focused ? 'home-outline' : 'home'}
                            color={color}
                            size={size}
                        />
                    )
                }} />

            <Tab.Screen
                name="agrot"
                component={agrot}
                options={{
                    title: "Pesquisa",
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={!focused ? 'magnify' : 'magnify'}
                            color={color}
                            size={size}
                        />
                    )
                }} />
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name={focused ? 'account' : 'account-outline'}
                            color={color}
                            size={size}
                        />
                    )
                }} />

        </Tab.Navigator>

    )
}
function MyStack() {
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
      >
        <Stack.Screen initialRouteName="Login" name="Login" component={Login} />
        <Stack.Screen name="home" component={Routes} />
        <Stack.Screen name="agrotoxicos" component={Agrotoxicos} screenOptions={{
            headerShown: true
        }} />
      </Stack.Navigator>
    );
  }

export default MyStack