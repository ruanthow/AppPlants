import React from 'react';

import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface PlantsCardProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: string
    }
}

export default function PlantsCardSecondery({ data, ...rest }: PlantsCardProps) {
    return (
        <RectButton style={style.container} {...rest}>
            <View style={style.content}>
                <SvgFromUri style={style.img} uri={data.photo} width={50} height={50} />
                <Text style={style.title}>
                    {data.name}
                </Text>
            </View>

            <View style={style.details}>
                <Text style={style.text}>
                    Regar ás
                </Text>
                <Text style={style.hour}>
                    {data.hour}
                </Text>
            </View>

        </RectButton>
    )
}

const style = StyleSheet.create({

    container: {
        
        
        height: 80,
        borderRadius:20,
        marginBottom:5,
        flexDirection: 'row',
        backgroundColor: colors.shape,
        justifyContent: 'space-between',
        alignItems: 'center',
        

    },
    content:{
        flexDirection: 'row',
        alignItems:'center'
       
    },
    img:{
        marginLeft:15
    },
    title: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
        fontSize: 17,
        marginLeft:15
        
    },
    details: {
        paddingRight:10
    },
    text: {
        paddingLeft:40,
        color:colors.body_light,
        fontFamily:fonts.text

    },
    hour:{
        paddingLeft:55,
        color:colors.body_dark,
        fontFamily:fonts.heading
    }

})
