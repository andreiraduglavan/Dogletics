import { Linking, Platform, StyleSheet } from 'react-native'
import { theme } from '../constants/theme'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomTabParamList } from '../types/navigationParams';
import { FontAwesome, MaterialCommunityIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect } from "react"
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/clientApp"

import HomeStackNavigator from './StackNavigators/HomeStackNavigator';
import ProfileStackNavigator from './StackNavigators/ProfileStackNavigator';
import CoursesStackNavigator from './StackNavigators/CoursesStackNavigator';
import WorkoutsStackNavigator from './StackNavigators/WorkoutsStackNavigator';
import { useAuthContext } from '../context/AuthContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator<BottomTabParamList>()

const TabNavigator = () => {
  const { userToken } = useAuthContext()
  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  useEffect(() => {
    if (lastNotificationResponse) {
      const body = lastNotificationResponse.notification.request.content.body
      const title = lastNotificationResponse.notification.request.content.title
      const url = lastNotificationResponse.notification.request.content.data.url
      
      if(url.includes('http')) {
        Linking.openURL(url)
      }

    }
  }, [lastNotificationResponse])

  useEffect(() => {
    // add notification token
    (async () => {
      try {
        
        const token = await registerForPushNotificationsAsync()
        
        if (userToken && token) {
          const id = userToken.customer.id.replace('gid://shopify/Customer/', '')
          
          const docRef = doc(db, "users", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            updateDoc(docRef, {pushTokens: arrayUnion({deviceId: Device.deviceName! + Device.modelName, pushToken: token})})
          } else {
            setDoc(docRef, {pushTokens: arrayUnion({deviceId: Device.deviceName! + Device.modelName, pushToken: token})})
          }
          
        }

      } catch (e) {
        console.log(e)
      }
    })()
    
  }, []);
  
  return (
    <NavigationContainer independent={true} theme={theme}>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown:false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.infoText,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: theme.dark == true ? theme.colors.background : theme.colors.card,
          tabBarInactiveBackgroundColor: theme.dark == true ? theme.colors.background : theme.colors.card, 
          tabBarIcon: ({focused, color, size }) => {
            let iconName
            if ( route.name =='Home' ) {
              return <FontAwesome name="newspaper-o" size={size} color={color} />
            } 
            if ( route.name =='Workouts' ) {
              return <MaterialCommunityIcons name="dumbbell" size={size} color={color} />
            } 
            if ( route.name =='Courses' ) {
              return <SimpleLineIcons name="graduation" size={size} color={color} />
            } 
            if ( route.name =='Profile' ) {
              return <Octicons name="person" size={size} color={color} />
            } 
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Workouts" component={WorkoutsStackNavigator} />
        <Tab.Screen name="Courses" component={CoursesStackNavigator} />
        <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  text: {
    color:theme.colors.primary
  }
})

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    
    token = (await Notifications.getExpoPushTokenAsync()).data;

  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default TabNavigator