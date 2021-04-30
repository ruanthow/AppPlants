import React, { useEffect, useState } from 'react';
import {
    View, 
    StyleSheet, 
    FlatList, 
    Text,
    ActivityIndicator,
    
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import Header from '../../components/Header';
import PlantsCardPrimary from '../../components/PlantsCardPrimary';
import EnviromentButton from '../EnviromentButton';
import Load from '../../components/Loading';
import photoGeneric from '../../assets/waterdrop.png';
import api from '../../services/api';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { PlantProps } from '../../libs/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';



interface EnvorimentProps {
    key:string;
    title:string;
}


export default function PlantSelect(){
    const [envoriment, setEnvoriment] = useState<EnvorimentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    
    const [userName, setUserName]= useState<string>()
    const [avatar, setAvatar]= useState<string>()
    const [envorimentSelected, setEnvorimentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    const navegation = useNavigation();


    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

   
    function handlePlantSelect(plant:PlantProps) {
        navegation.navigate('PlantsSave', {plant})
    }

    function handleSelectedEnvoriment(envoriment:string){
        setEnvorimentSelected(envoriment)

        if(envoriment === 'all')
        return setFilteredPlants(plants);
        
        const filtered = plants.filter(plant =>
            plant.environments.includes(envoriment)
        );
        setFilteredPlants(filtered);
        
    }

    function handlePlantsDataMore(distance: number){
        if(distance < 1)
            return;
            setIsLoadingMore(true);
            setPage(page + 1);
            PlantsData()     
    }

    useEffect(() => {
       async function EnviromentData(){
           
           const { data } =  await api.get('/plants_environments?_sort=title&_order=asc');
          
           setEnvoriment([
               {
                key:'all',
                title:'Todos'
               },
               ...data
           ])
        }
        EnviromentData();
    }, []);

    useEffect(() => {
         PlantsData();
    }, []);

    
    

    useEffect(() => {
     async function GetStorage() {
        const user = await AsyncStorage.getItem('@plantmanager:user')
        const userAvatar = await AsyncStorage.getItem('@plantmanager:avatar')
        if(!userName)
        setUserName(user || undefined)
        if(!avatar)
        setAvatar(userAvatar || undefined)
        }
       
       GetStorage();

    }, [userName, avatar]);

   
   
        async function pickImage(){
        
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                quality:1,
                aspect:[5,5]
            })
            
            if(!result.cancelled){
                await AsyncStorage.setItem('@plantmanager:avatar', result.uri)
                setAvatar(result.uri)
                console.log(result)
            }      
        } 
    

    async function PlantsData(){
        const { data } =  await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        if(!data)
        return setLoading(true);
        
        if(page > 1){
            setPlants(oldValue =>[...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        }
        else{
            setPlants(data);
            setFilteredPlants(data);
        }    
        setIsLoadingMore(false)
        setLoading(false)
     }

    if(loading)
       return <Load/>
    

    return(
            <View style={style.container}>    
                <View style={style.header}>
                    <Header title={"Olá"} name={userName} photo={avatar ? avatar : undefined } changPhoto={pickImage}/>
                    <Text style={style.title}>
                        Em qual ambiente
                    </Text>
                    <Text style={style.subtitle}>
                        você quer colocar sua planta ?
                    </Text>
                </View>
                <View>
                    <FlatList 
                    keyExtractor={(item)=> String(item.key)}
                    data={envoriment}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={style.envorimenteList}
                    renderItem={({item})=>( 
                        <EnviromentButton
                            title={item.title}
                            isActive={item.key === envorimentSelected}
                            onPress={()=> handleSelectedEnvoriment(item.key)}  
                        />
                    )}
                    />
                </View>
                <View style={style.plants}>
                    <FlatList
                    data={filteredPlants} 
                    keyExtractor={(item)=> String(item.id)}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => handlePlantsDataMore(distanceFromEnd)}
                
                    renderItem={(item)=>(
                        <PlantsCardPrimary
                            data={item.item}
                            onPress={()=> handlePlantSelect(item.item)}
                        />
                    )}
                    ListFooterComponent={
                        isLoadingMore ?
                        <ActivityIndicator color={colors.green}/>
                        :
                        <></>
                    }
                    />
                </View>       
            </View>
       
    )
}


const style = StyleSheet.create({
    container:{
        flex:1,
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
        justifyContent:'center',
        paddingBottom:5,
        marginVertical:32,
        marginHorizontal:20
    },
    plants:{
        flex:1,
        height:'130%',
        paddingHorizontal:20,
        justifyContent:'center'

    }
})