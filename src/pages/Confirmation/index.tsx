import { useNavigation } from '@react-navigation/core';
import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


export default function Confirmation(){

    const navegation = useNavigation()

    function handleMoveOn(){
        navegation.navigate('PlantSelect')
    }

    return(
        <SafeAreaView style={style.container}>
            <View style={style.content}>
                <Text style={style.emoji}>
                    😁
                </Text>
                <Text style={style.title}>
                    Prontinho
                </Text>
                <Text style={style.subtitle}>
                    Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
                </Text>
                <View style={style.footer}>
                    <Button title="Começar" onPress={handleMoveOn}/>
                </View>   
            </View>
        </SafeAreaView>
    )   
}

const style = StyleSheet.create({

    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'space-around',
        
    },
    content:{
        flex:1,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding:30
    },
    emoji:{
        fontSize: 80
        
    },
    title:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginBottom:16,
        marginTop: 40
        

    },
    subtitle:{
        fontSize:17,
        fontFamily:fonts.text,
        color:colors.heading,
        textAlign:'center',
        
    },
    footer:{
        marginTop:40,
        paddingHorizontal:50,
        width:'100%'
    }
    
})