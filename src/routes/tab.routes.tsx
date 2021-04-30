import React from 'react';
import {Platform} from 'react-native'
import { createBottomTabNavigator,BottomTabView} from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import {MaterialIcons} from '@expo/vector-icons'
import PlantSelect from '../pages/PlantSelect';
import MyPlants from '../pages/MyPlants';


const AppTabs = createBottomTabNavigator();

const AuthRoutes = () => {



    return (
        
        <AppTabs.Navigator

            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style: {
                    height: 88,
                    paddingVertical: Platform.OS == 'ios' ? 20 : 0
                }
            }}
        >
            <AppTabs.Screen
                name="Nova Planta"
                component={PlantSelect}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons
                        name="add-circle-outline"
                        size={size}
                        color={color}
                        />
                    ))
                }}
           />
        
            <AppTabs.Screen
                name="Minhas Plantas"
                component={MyPlants}
                options={{ 
                    tabBarIcon:(({ size, color }) => (
                        <MaterialIcons
                        name="format-list-bulleted"
                        size={size}
                        color={color}
                        />
                    ))
                }}
           />
        </AppTabs.Navigator>
    )
}

export default AuthRoutes