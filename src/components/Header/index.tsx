import React from 'react';

import {TouchableOpacity, Text, StyleSheet, View, SafeAreaView, Image} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../../styles/colors';
import userPng from '../../assets/profile.png';
import fonts from '../../styles/fonts';


export default function Header(){
    return(
        
            <View style={style.container}>
                <View >
                    <Text style={style.greeting}>Ola!,</Text> 
                    <Text style={style.userName}>Ruan</Text>
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
        paddingVertical: 20,
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
        fontFamily: fonts.text
    },
    userName:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight:40
    }
})