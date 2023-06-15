import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { theme } from "../constants/theme"
import { useAuthContext } from "../context/AuthContext"
import { RootStackParamList } from "../types/navigationParams"
import Login from "./Login"
import PasswordForgotEmailSend from "./PasswordForgotEmailSend"
import ForgotPassword from "./ForgotPassword"
import SignUp from "./SignUp"
import TabNavigator from "./TabNavigator"
import VerifyEmail from "./VerifyEmail"


const RootStack = createNativeStackNavigator<RootStackParamList>()

const MainNavigator = () => {
  const { userToken } = useAuthContext()

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator 
        screenOptions={{
          headerShown: false,
          headerBackTitle: '',
          headerTintColor: theme.colors.text,
          headerStyle: { backgroundColor: theme.colors.background }}}
      > 
        {userToken == null ? (
          <>
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="SignUp" component={SignUp} />
            <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
            <RootStack.Screen name="PasswordForgotEmailSend" component={PasswordForgotEmailSend} />
            <RootStack.Screen name="VerifyEmail" component={VerifyEmail} />
          </>
        ) : (
          <RootStack.Screen name="TabNavigator" component={TabNavigator} />
        )}

        {/* <RootStack.Screen name="Walkthrough" options={{headerShown: false}} component={Walkthrough} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator