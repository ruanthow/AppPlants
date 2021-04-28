import React from 'react';

import { View, Text, StyleSheet, } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    isActive?: boolean;
}

export default function EnviromentButton({
    title,
    isActive = false,
    ...rest
}: EnviromentButtonProps) {
    return (
        <View>
            <RectButton style={[
                style.container,
                isActive && style.containerActive
                ]} 
                {...rest}
            >
                <Text style={[
                    style.text,
                    isActive && style.textActive
                    ]}
                >
                {title}
                </Text>
            </RectButton>

        </View>
    )
}

const style = StyleSheet.create({
    container:{
      height:40,
      width:76,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: colors.shape,
      borderRadius:12,
      marginHorizontal: 5

    },
    text:{
        color:colors.heading,
        fontFamily: fonts.text
    },
    containerActive:{
       
        backgroundColor: colors.green_light
    },
    textActive:{
        fontFamily:fonts.heading,
        color:colors.green_dark,
    }
})