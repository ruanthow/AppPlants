import React from 'react';

import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Sweipeable from 'react-native-gesture-handler/Swipeable';
import { SvgFromUri } from 'react-native-svg'

import {Feather} from '@expo/vector-icons'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface PlantsCardProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: string
    }
    handleRemove: () => void
}

export default function PlantsCardSecondery({ data, handleRemove, ...rest }: PlantsCardProps) {
    return (
        <Sweipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <View>
                        <RectButton
                            style={style.buttonRemove}
                            onPress={handleRemove}
                        >
                        <Feather name="trash" size={32} color={colors.white}/>
                        </RectButton>
                    </View>
                </Animated.View>
            )}
        >   
            <View style={style.container}>
                <RectButton style={style.button} {...rest}>              
                        <SvgFromUri uri={data.photo} width={50} height={50} />
                        <Text style={style.title}>
                            {data.name}
                        </Text>
                   

                    <View style={style.details}>
                        <Text style={style.text}>
                            Regar ás
                        </Text>
                        <Text style={style.hour}>
                            {data.hour}
                        </Text>
                    </View>
                </RectButton>
            </View>
        </Sweipeable>
    )
}

const style = StyleSheet.create({

    container: {
        margin:5,
        width:'100%',
        height: 80,
        borderRadius: 20,
        marginHorizontal:10,
        backgroundColor: colors.shape,
        justifyContent:'center'
        
       


    },
    button:{
        paddingHorizontal:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
        
        
    },
    content: {
        

    },
    details:{
       
    },
    title: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        fontSize: 17,
        
        

    },
    text: {
        
        color: colors.body_light,
        fontFamily: fonts.text

    },
    hour: {
        
        color: colors.body_dark,
        fontFamily: fonts.heading
    },
    buttonRemove:{
        width:100,
        height:80,
        backgroundColor:colors.red,
        marginTop:5,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        right:20,
        paddingLeft:20
    }
})
