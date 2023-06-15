import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button } from 'react-native'
import { text, theme } from '../../constants/theme'
import { useAuthContext } from '../../context/AuthContext'
import { useStateContext } from '../../context/StateContext'
import { ProfileStackParamList } from '../../types/navigationParams'
import ChangePassword from '../ChangePassword'
import Language from '../Language'
import PersonalInformations from '../PersonalInformations'

import Profile from '../Profile'

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>()

const ProfileStackNavigator = () => {
  const { signOut } = useAuthContext()
  const { language } = useStateContext()

  return (
    <NavigationContainer theme={theme} independent={true}>
      <ProfileStack.Navigator>
        <ProfileStack.Screen 
          name='Profile' 
          component={Profile}
          options={{
            headerLargeTitle: true, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerRight: () => (<Button title={text[language].signOut} color={theme.colors.text} onPress={() => signOut() } />),
            title: text[language].profile
          }} 
        />
        <ProfileStack.Screen 
          name='ChangePassword' 
          component={ChangePassword}
          options={{
            headerLargeTitle: false, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
            title: text[language].changePassword
          }} 
        />
        <ProfileStack.Screen 
          name='Language' 
          component={Language}
          options={{
            headerLargeTitle: false, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
            title: text[language].changeLanguage
          }} 
        />
        <ProfileStack.Screen 
          name='PersonalInformations' 
          component={PersonalInformations}
          options={{
            headerLargeTitle: false, 
            headerStyle:{backgroundColor: theme.colors.background}, 
            headerShadowVisible: false,
            headerTintColor: theme.colors.text,
            title: text[language].personalInformations
          }} 
        />
      </ProfileStack.Navigator>
    </NavigationContainer>
  )
}

export default ProfileStackNavigator