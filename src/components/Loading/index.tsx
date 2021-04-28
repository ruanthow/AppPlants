import React from 'react';
import {StyleSheet, View} from 'react-native';

import LotieView from 'lottie-react-native';


import loadingAnimation from '../../assets/load.json';


export default function Loading(){
    return(
        <View style={style.container}>
            <LotieView 
            style={style.animation} 
            source={loadingAnimation}
            autoPlay
            loop
            >

            </LotieView>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    animation:{
        backgroundColor:'transparent',
        width:200,
        height:200
    }
})