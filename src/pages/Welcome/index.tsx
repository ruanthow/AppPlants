import React from 'react';
import {
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    View
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import x from '../../assets/watering.png'
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/core';

export default function Welcome() {
    const navegation = useNavigation();


    function handleStart(){
       navegation.navigate('UserIndentification')
    }
    return (
        <SafeAreaView style={style.container}>
            <View style={style.wrapper}>
                <Text style={style.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma facil
                 </Text>

                <Image source={x} style={style.image} resizeMode="contain" />

                <Text style={style.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity style={style.button} activeOpacity={0.7} onPress={handleStart}>

                    <Feather name="chevron-right" style={style.buttonIcon} />

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    image: {
        height: Dimensions.get('window').width * 0.7
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        padding: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,

    },
    buttonIcon: {
        color: colors.white,
        fontSize: 24
    }


})