import React, { useEffect } from 'react';
import Routes from './src/routes/index';
import * as Notification from 'expo-notifications'

import AppLoading from 'expo-app-loading';

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import { PlantProps } from './src/libs/storage';


export default function App() {

  const [fontsLoading] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    const subscription = Notification.addNotificationReceivedListener(
      async notification => {
      const data = await notification.request.content.data.plant as PlantProps
      console.log(data);
      })
     
      return () => subscription.remove()
    // async function notifications(){
    //   Notification.cancelAllScheduledNotificationsAsync();

    //   const data = await Notification.getAllScheduledNotificationsAsync();
    //   console.log('##############  NOTIFICAÇÕES ############')
    //   console.log(data);
      
    // }
    // notifications();
  },[])

  if (!fontsLoading) {
    return <AppLoading />
  }

  return (
    <Routes />
  )
}

