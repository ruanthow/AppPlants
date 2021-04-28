import React, { useEffect } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,

} from 'react-native';

import { SvgUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {useNavigation, useRoute} from '@react-navigation/core';
import DateTimerPicker, { Event } from '@react-native-community/datetimepicker';

import waterdrop from '../../assets/waterdrop.png';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useState } from 'react';

import { isBefore } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { format } from 'date-fns/esm';
import savePlant, { LoadingPlant, PlantProps } from '../../libs/storage';

interface Params{
    plant: PlantProps
}

export default function PlantsSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker,setShowDatePicker] = useState(Platform.OS == 'ios');
    const navegation = useNavigation()
    useEffect(() => {
        console.log(selectedDateTime)
    }, [selectedDateTime]);

    const route = useRoute();
    const { plant } = route.params as Params;

    function handleChangeTime(event:Event, dateTime:Date | undefined){
        if(Platform.OS == 'android'){
            setShowDatePicker(oldValue => !oldValue)
        }
        
        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date())
            return Alert.alert('Escolhar uma data futura ⏰');    
        }

        if(dateTime)
        setSelectedDateTime(dateTime)       
    }

    function handleOpenDateOptionAndroid(){
        setShowDatePicker(oldState => !oldState)
    }

  async function handleSavePlant() {
     
        try{
          await savePlant({
                ...plant,
                dateTimeNotification:selectedDateTime
            })

            navegation.navigate('Confirmation', {
                title:'Tudo certo',
                subTitle:'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                icon:'hug',
                buttonTitle:'Muito obrigado :D',
                nextPage:'MyPlants'
            })

        }catch{
           return Alert.alert('Não foi possivel salvar a Planta 😥')
        }
    }


    return (
        <View style={style.container}>
            <View style={style.content}>
                <SvgUri
                    uri={plant.photo}
                    width={156} height={176}
                />
                <Text style={style.plantName}>
                    {plant.name}
                </Text>
                <Text style={style.plantAbout}>
                    Não pode pegar sol e deve ficar em {'\n'}
                    temperatura ambiente, dentro de casa.
                </Text>

                <View style={style.containerInfo}>
                    <View style={style.info}>
                        <Image
                            source={waterdrop}
                            style={style.img}
                        />
                        <Text style={style.text}>
                            A rega deve ser feita com {'\n'}
                            400ml a cada dois dias
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={style.alertText}>
                    Ecolha o melhor horário para ser lembrado:
                    </Text>

                </View>
            </View>
            {   showDatePicker && 
                (<DateTimerPicker
                value={selectedDateTime}
                mode={'time'}
                display={'spinner'}
                onChange={handleChangeTime}
                />)

            }
            {
                Platform.OS == 'android' && (
                    <TouchableOpacity onPress={handleOpenDateOptionAndroid}>
                        <Text style={style.dataTimerPicker}>
                            {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                    </TouchableOpacity>
                    
                )
            }
            <View style={style.button}>
                <Button title="Cadastar Planta" onPress={handleSavePlant} />
            </View>
            
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,  
        

    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
        
    },

    plantName: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: fonts.heading,
        fontSize: 25,
        color: colors.heading,

    },

    plantAbout: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: fonts.text,
        lineHeight: 20,
        color: colors.heading
    },

    containerInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.blue_light,
        paddingHorizontal:30,
        marginVertical:20,
        height:100,
        borderRadius:15
        
    },
    
    info:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },

    img: {
        marginRight:20
    },
    text: {
        color:colors.blue,

    },
    alertText: {
        color:colors.heading,
        fontFamily:fonts.text
    },
    button:{
        paddingHorizontal:32,
        marginVertical:getBottomSpace() || 20
    },
    dataTimerPicker:{
        textAlign:'center',
        fontSize:20,
        color:colors.heading,
        fontFamily:fonts.text
    }
})