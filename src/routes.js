import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './pages/Home'
import agrot from './pages/Compendio'
import Culture from './pages/Culturas'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

function Routes() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ paddingBottom: 48, backgroundColor:'#694fad' }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Incio',
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                        />
                    )
                }} />

            <Tab.Screen
                name="agrot"
                component={agrot}
                options={{
                    title: 'Agrotoxicos',
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name="cube"
                            color={color}
                            size={size}
                        />
                    )
                }} />
            <Tab.Screen
                name="Culture"
                component={Culture}
                options={{
                    title: 'Culturas',
                    tabBarIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons
                            name="bell"
                            color={color}
                            size={size}
                        />
                    )
                }} />
        </Tab.Navigator>

    )
}
export default Routes