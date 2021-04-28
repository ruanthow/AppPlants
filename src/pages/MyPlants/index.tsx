
import React, { useState } from 'react';

import { StyleSheet, View, Image, Text, FlatList } from 'react-native';
import Header from '../../components/Header';
import colors from '../../styles/colors';

import waterdrop from '../../assets/waterdrop.png';
import fonts from '../../styles/fonts';
import { LoadingPlant, PlantProps } from '../../libs/storage';
import { useEffect } from 'react';
import { formatDistance } from 'date-fns';
import pt_Br from 'date-fns/locale/pt-BR';
import { SvgUri } from 'react-native-svg';
import { format } from 'date-fns/esm';
import PlantsCardSecondery from '../../components/PlantsCardSecondery';

export default function MyPlants() {

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [nextWater, setNextWater] = useState<string>()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
      async function GetMyPlants() {
        const data = await LoadingPlant();

        const nextTime = formatDistance(
           new Date(data[0].dateTimeNotification).getTime(), 
            new Date().getTime(),
            {
                locale:pt_Br
            }
            )
        setMyPlants(data);
        setNextWater(`Regue sua ${data[0].name} ${'\n'}daqui a ${nextTime}`)
        setLoading(false)
        }
        GetMyPlants()
    },[])
    
    return (
        <View style={style.container}>
            <Header />
            <View style={style.warring}>
                <Image source={waterdrop} style={style.waterImg} />
                <Text style={style.warringText}>
                    {nextWater}
                </Text>
                
            </View>
            <View >
                <Text style={style.title}>
                    Próximas Regadas
                </Text>
                
            </View>
            <FlatList 
            data={myPlants} 
            keyExtractor={(item)=> String(item.id)}
            renderItem={({item})=>(
                <PlantsCardSecondery
                    data={item}
                />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.list}
            
            
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom:50,
        backgroundColor: colors.background
    },
    warring:{
        backgroundColor:colors.blue_light,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        
        width:'100%',
        height:80,
        borderRadius:15     

    },
    warringText:{
        fontSize:15,
        fontFamily:fonts.text,
        color:colors.blue
    },
    waterImg:{
        marginRight:20
    },
    title:{
       fontSize:25,
       fontFamily:fonts.heading,
       color:colors.heading,
       paddingVertical:30
        
    },
    list:{
        paddingVertical:10
    }
})