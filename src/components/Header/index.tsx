import React, {useEffect, useState} from 'react';

import { Text, StyleSheet, View, Image} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';



import colors from '../../styles/colors';

import fonts from '../../styles/fonts';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

interface Headerprops{
    title:string;
    name:string | undefined;
    photo:string | undefined;
    changPhoto: () => Promise<void>;
}


export default function Header({title, name, photo, changPhoto}:Headerprops){
    const navegation = useNavigation()

    return(
        <View style={style.container}>
            <View >
                <Text style={style.greeting}>{title}</Text> 
                <Text style={style.userName}>{name}</Text>
            </View>
            <RectButton
                onPress={changPhoto}
            >
                <Image style={style.img} source={{uri:photo}}/>
            </RectButton>
            
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