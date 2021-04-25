import React from 'react';
import {
    View, 
    StyleSheet, 
    FlatList, 
    Text} from 'react-native';
import Header from '../../components/Header';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import EnviromentButton from '../EnviromentButton';


export default function PlantSelect(){
    var teste = "oi";
    return(
        <View style={style.container}>    
            <View style={style.header}>
                <Header/>
                <Text style={style.title}>
                    Em qual ambiente
                </Text>
                <Text style={style.subtitle}>
                    você quer colocar sua planta ?
                </Text>
            </View>
            <View>
                <FlatList 
                data={[1,2,3,4,5]}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={style.envorimenteList}
                renderItem={(key)=>( 
                    <EnviromentButton
                        title="Cozinha"
                        isActive
                    />
                )}
                />
            </View>
           
       </View>
    )
}


const style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.background
    },
    header:{
        paddingHorizontal:30
    },
    title:{
        fontSize:17,
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:20,
        marginTop:15
    },
    subtitle:{
        fontSize:17,
        color:colors.heading,
        fontFamily:fonts.text,
        lineHeight:20,
        marginTop:15
    },
    envorimenteList:{
        height:40,
        width:'130%',
        justifyContent:'center',
        paddingBottom:5,
        marginVertical:32
    }
})