import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { theme } from '../../constants/theme'
import { WorkoutsStackParamList } from '../../types/navigationParams'
import Exercise from '../Exercise'
import Workout from '../Workout'
import WorkoutsScreen from '../WorkoutsScreen'

const WorkoutsStack = createNativeStackNavigator<WorkoutsStackParamList>()

const WorkoutsStackNavigator = () => {
  return (
    <NavigationContainer theme={theme} independent={true}>
      <WorkoutsStack.Navigator>
        <WorkoutsStack.Screen 
          name='Workouts' 
          component={WorkoutsScreen}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false
          }} 
        />
        <WorkoutsStack.Screen 
          name='Exercise' 
          component={Exercise}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
          }} 
        />
        <WorkoutsStack.Screen 
          name='Workout' 
          component={Workout}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
          }} 
        />
      </WorkoutsStack.Navigator>
    </NavigationContainer>
  )
}

export default WorkoutsStackNavigator