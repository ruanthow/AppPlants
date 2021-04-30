
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, FlatList, ScrollView, Alert } from 'react-native';


import Header from '../../components/Header';
import { LoadingPlant, PlantProps, RemovePlant} from '../../libs/storage';
import { formatDistance } from 'date-fns';
import pt_Br from 'date-fns/locale/pt-BR';
import PlantsCardSecondery from '../../components/PlantsCardSecondery';
import Loading from '../../components/Loading';


import colors from '../../styles/colors';
import waterdrop from '../../assets/waterdrop.png';
import fonts from '../../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';





export default function MyPlants() {

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [nextWater, setNextWater] = useState<string>()
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState<string>()
    const [userAvatar, setUserAvatar] = useState<string>()
    
    
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
        
        }
        GetMyPlants()
    },[])
    
    useEffect(() => {
        async function GetStorage() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            const avatar = await AsyncStorage.getItem('@plantmanager:avatar')
            if(!userName)
            setUserName(user || '')
            if(!userAvatar)
            setUserAvatar(avatar || undefined)
            }
           
           GetStorage();
           setLoading(false)
    }, [userName, userAvatar]);
    
    
    function handleRemove(plant:PlantProps){
        Alert.alert('Remover', `Deseja mesmo remover a ${plant.name} ?`, [
            {
                text:'Não 🙏',
                style:'cancel'
            },
            {
                text:'Sim 😥',
                onPress: async () => {
                    try{
                        await RemovePlant(String(plant.id)) 
                        setMyPlants((oldData)=>(
                           oldData.filter((item)=> item.id != plant.id )
                       ))
                    }catch(error){
                        Alert.alert('Não foi possivel remover!')
                    }
                }
            }
        ])
    }

    if(loading)
      return  <Loading/>
    
      return (
            <View style={style.container}>
                <Header title={"Olá"} name={userName} photo={userAvatar ? userAvatar : undefined } changPhoto={async()=>{}}/>
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
                <View style={style.list}>
                    <FlatList 
                        data={myPlants} 
                        keyExtractor={(item)=> String(item.id)}
                        renderItem={({item})=>(
                            <PlantsCardSecondery
                                handleRemove={() => handleRemove(item)}
                                data={item}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        
                    />
                </View>
                </View>
                
    )
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        backgroundColor: colors.background
    },
    warring:{
        backgroundColor:colors.blue_light,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20,
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
        flex:1,
        paddingRight:0,
        justifyContent:'center'
        
    }
    
})