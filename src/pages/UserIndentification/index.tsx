
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'

import {StyleSheet, SafeAreaView, View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native'
import Button from '../../components/Button'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'


export default function UserIndentification(){

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFillded] = useState(false)
    const [name, setName] = useState<string>()

    const navegation = useNavigation();


    function handleSubmit(){
       navegation.navigate('Confirmation')
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFillded(!!name)
    }
    
    function handleInputFocus(){
        setIsFocused(true);
    }

    function hanldeInputChange(value:string){
        setIsFillded(!!value);
        setName(value);
    }

    return(
        <SafeAreaView style={style.container}>
            <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.content}>
                        <View style={style.form}>
                            <View style={style.header}>
                                <Text style={style.emoji}>
                                    {isFilled ? '😄' : '🙂'}
                                </Text>
                                
                                <Text style={style.title}>
                                Como podemos {'\n'}
                                chamar você?
                                </Text>
                            </View>    

                            <TextInput  
                            style={[
                                style.input, 
                                    (isFocused || isFilled) && {borderColor: colors.green}
                                ]} 
                                placeholder="Digite seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={hanldeInputChange}
                                />

                            <View style={style.footer}>
                                    <Button title="Confirmar" onPress={handleSubmit}/>
                            </View>                  
                        </View>
                    </View>
                </TouchableWithoutFeedback>   
            </KeyboardAvoidingView>    
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        
    },
    content:{
        flex:1,
        width:'100%'
    },
    form:{
        flex:1,
        paddingHorizontal:54,
        justifyContent:'center',
        alignItems: 'center'
    },
    header:{
        justifyContent:'center',
        alignItems:'center'
    },
    emoji:{
        color:'#000',
        fontSize: 44,

    },
    input:{
        borderBottomWidth:1,
        borderColor: colors.gray,
        color: colors.heading,
        width:'100%',
        fontSize:18,
        marginTop:50,
        padding: 10,
        textAlign:'center'
    },
    title:{
        fontSize:24,
        lineHeight:32,
        textAlign:'center',
        color:colors.heading,
        fontFamily:fonts.heading,
        marginTop:20,
    },
    footer:{
        marginTop:40,
        width:'100%',
        paddingHorizontal:20
    }

})