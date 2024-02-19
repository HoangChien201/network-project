import 'react-native-gesture-handler';
import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { UserRootStackScreens,UserRootStackParams } from './UserRootStackParams';
import { Image } from 'react-native';


const Stack=createStackNavigator<UserRootStackParams>();

export default function UserStack():React.JSX.Element{
    return (
        <Stack.Navigator
            screenOptions={{
               
                cardStyle:{
                    backgroundColor:'#fff'
                },
                headerStyle:{backgroundColor:'#fff'}
                
            }}
        >
            {
                UserRootStackScreens.map((item,index)=>{
                    return <Stack.Screen
                        key={item.id}
                        component={item.component}
                        name={item.name}
                        options={item.options}
                    />
                })
            }
        </Stack.Navigator>
    )
}