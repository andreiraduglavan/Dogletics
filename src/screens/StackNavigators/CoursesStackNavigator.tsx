import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { text, theme } from '../../constants/theme'
import { CoursesStackParamList } from '../../types/navigationParams'

import Lesson from '../Lesson'
import Course from '../Course'
import Courses from '../Courses'
import { useStateContext } from '../../context/StateContext'

const CoursesStack = createNativeStackNavigator<CoursesStackParamList>()

const CoursesStackNavigator = () => {
  const { language } = useStateContext()
  return (
    <NavigationContainer theme={theme} independent={true}>
      <CoursesStack.Navigator>
        <CoursesStack.Screen 
          name='Courses' 
          component={Courses}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            title: text[language].courses
          }} 
        />
        <CoursesStack.Screen 
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
        <CoursesStack.Screen 
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
      </CoursesStack.Navigator>
    </NavigationContainer>
  )
}

export default CoursesStackNavigator