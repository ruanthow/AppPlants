import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as Notifications from 'expo-notifications'




export interface PlantProps{
    id: number;
    name: string;
    about: string;
    water_tips:string;
    photo: string;
    environments:[string];
    frequency: {
      times: number;
      repeat_every: string;
      }
    dateTimeNotification: Date;
    hour:string  
}

export interface StoragePlantProps{
    [id:string]:{
        data: PlantProps,
        notificationId:string
    }
}


export default async function savePlant(plant:PlantProps): Promise<void>{
    try{
        const nextTime = new Date(plant.dateTimeNotification);
        const now = new Date();

        const {repeat_every, times} = plant.frequency;

        if(repeat_every === 'week'){
            const interval = Math.trunc( 7 / times) //6
            nextTime.setDate(now.getDate() + interval) 
        }else{
            nextTime.setTime(nextTime.getDate() + 1 )
        }
        // Math.abs = numero sem casas decimas
        // Math.ceil = arredonda pra cima 
        const seconds = Math.abs(Math.ceil(now.getTime() - nextTime.getTime()) / 1000)

        const notificationId = await Notifications.scheduleNotificationAsync({
            content:{
                title: 'Heey, 🌿',
                body: `Esta na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data:{
                    plant
                },
            },
            trigger:{
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        })

        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {} ;
        
        const newPlant = {
          [plant.id]:{
              data: plant,
              notificationId
          }  
        }

        await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify({
            ...newPlant,
            ...oldPlants         
        }))

    }catch(error){
        throw Error(error);
    }
}

export async function LoadingPlant(): Promise<PlantProps[]>{
    try{
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {} ;
        
        const plantsShorted = Object.keys(plants).map((plant)=>{
            return{
                ...plants[plant].data,
                hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
            }
        }).sort((a,b)=>
            Math.floor(
                new Date(a.dateTimeNotification).getTime() / 1000 - Math.floor(new Date(b.dateTimeNotification).getTime() / 100)
            )
        )
        
        return plantsShorted;
    }catch(error){
        throw Error(error);
    }
}

export async function RemovePlant(id:string): Promise<void>{
    const data = await AsyncStorage.getItem('@plantmanager:plants')

    const plants =  data ? (JSON.parse(data) as StoragePlantProps) : {}

    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId)

    delete plants[id];

    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants))

}



