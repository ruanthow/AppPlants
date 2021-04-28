import React from 'react';

import { View, Text, StyleSheet, FlatList} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface PlantsCardProps extends RectButtonProps{
    data:{
        name:string,
        photo:string
    }
}

export default function PlantsCardPrimary({data, ...rest}: PlantsCardProps) {
    return (
        <RectButton style={style.container} {...rest}>
            <SvgFromUri style={style.img} uri={data.photo} width={73} height={79}/>
            <Text style={style.text}>
                {data.name}
            </Text>
        </RectButton>
    )
}

const style = StyleSheet.create({

    container: {
        flex:1,
        height: 154,
        maxWidth:'45%',
        backgroundColor: colors.shape,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 20,
        margin:10


    },
    text: {
        color:colors.green_dark,
        fontFamily: fonts.heading
    },
    img:{
        marginBottom:10
    }
    
})