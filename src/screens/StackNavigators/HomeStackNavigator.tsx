import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BellHeaderIcon from '../../components/Home/BellHeaderIcon'
import { text, theme } from '../../constants/theme'
import { useStateContext } from '../../context/StateContext'
import { HomeStackParamList } from '../../types/navigationParams'
import Course from '../Course'
import Courses from '../Courses'
import Exercise from '../Exercise'

import Home from '../Home'
import Lesson from '../Lesson'
import Notifications from '../Notifications'
import Workout from '../Workout'
import WorkoutsScreen from '../WorkoutsScreen'

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackNavigator = () => {
  const { language } = useStateContext()
  return (
    <NavigationContainer theme={theme} independent={true}>
      <HomeStack.Navigator>
        <HomeStack.Screen 
          name='Home' 
          component={Home}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTitle: text[language].welcome,
            headerRight: () => (<BellHeaderIcon />)
          }} 
        />
        <HomeStack.Screen 
          name='Courses' 
          component={Courses}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
          }} 
        />
        <HomeStack.Screen 
          name='Course' 
          component={Course}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
            title: ''
          }} 
        />
        <HomeStack.Screen 
          name='Lesson' 
          component={Lesson}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
            title: ''
          }} 
        />
        <HomeStack.Screen 
          name='Workouts' 
          component={WorkoutsScreen}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
          }} 
        />
        <HomeStack.Screen 
          name='Exercise' 
          component={Exercise}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text
          }} 
        />
        <HomeStack.Screen 
          name='Workout' 
          component={Workout}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text
          }} 
        />
        <HomeStack.Screen 
          name='Notifications' 
          component={Notifications}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text
          }} 
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  )
}

export default HomeStackNavigator

