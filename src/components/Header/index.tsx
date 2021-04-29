import React, {useEffect, useState} from 'react';

import {TouchableOpacity, Text, StyleSheet, View, SafeAreaView, Image} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';


import colors from '../../styles/colors';
import userPng from '../../assets/profile.png';
import fonts from '../../styles/fonts';

interface Headerprops{
    title:string;
    name:string | undefined;
}


export default function Header({title, name}:Headerprops){


    return(
        <View style={style.container}>
            <View >
                <Text style={style.greeting}>{title}</Text> 
                <Text style={style.userName}>{name}</Text>
            </View>

            <Image style={style.img} source={userPng}/>
        </View>
    )
}


const style = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: 5,
        marginTop:getStatusBarHeight(),
        
    },
    img:{
        width:70,
        height:70,
        borderRadius:40
    },
    greeting:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.heading
    },
    userName:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight:40
    }
})