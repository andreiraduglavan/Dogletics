import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, ScrollView, Image, TextInput, Text, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import Button from '../components/Shared/Button';
import { text, theme } from '../constants/theme'
import { RootStackParamList } from '../types/navigationParams'
import logo from '../../assets/dogletics-logo.png'
import logoDark from '../../assets/dog-letics-logo-dark.png'
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useStateContext } from '../context/StateContext';

export type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({navigation}: Props) => {
  const { language } = useStateContext()
  const { signIn } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>()

  const signInButton = async () => {
    setLoading(true)
    setErrorMessage(null)

    try {
      await signIn(email, password)
    } catch (error: any) {
      typeof error === 'string' && setErrorMessage(error)
    }

    setLoading(false)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'position' : 'height'}>
      <ScrollView scrollEnabled={Platform.OS == 'ios' ? false : true}>
        <View style={styles.container} >
          <Image source={theme.dark ? logoDark : logo} style={styles.image}/>

          {/* { errorMessageStatus ?
            <View style={{height:32}}>
              <Text style={{color:'red'}}>{errorMessage}</Text>
            </View> :
            <View style={{height:32}}><Text style={{color:COLORS.background}}>peco</Text></View> */
          }

          { errorMessage ?
            <View style={{height:32}}>
              <Text style={{color:'red'}}>{errorMessage}</Text>
            </View> :
            <View style={{height:32}}><Text style={{color:theme.colors.background}}>peco</Text></View>
          }

          <TextInput 
            placeholder={text[language].email}
            placeholderTextColor={theme.colors.infoText} 
            style={styles.textInput} 
            onChangeText={text => setEmail(text) } 
            autoCapitalize={'none'} 
            value={email}
          />
          <TextInput 
            placeholder={text[language].password}
            placeholderTextColor={theme.colors.infoText} 
            secureTextEntry={true} 
            style={[styles.textInput, { marginBottom:24 }]} 
            onChangeText={text => setPassword(text) } 
            autoCapitalize={'none'} 
            value={password}
          />

          { loading ? 
            <ActivityIndicator /> :
            <Button 
              title={text[language].loginButton} 
              onPress={signInButton}
              width='auto'
            />
          }

        <Text style={{marginTop: 24, color:theme.colors.infoText}}>
          {text[language].noAccountQ}
          <Text 
            style={{color:theme.colors.primary, fontWeight:'500', marginLeft:4}} 
            onPress={() => { navigation.navigate('SignUp')} }
          >
            {' '}{text[language].signUp}
          </Text>
        </Text>

        <Text 
          style={{color:theme.colors.primary, fontWeight:'500', marginLeft:4, marginTop:6, paddingBottom:24}} 
          onPress={() => { navigation.navigate('ForgotPassword')} }
        >
          {text[language].forgotPasswordQ}
        </Text>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      paddingTop: 128,
    },
    text: {
      color: theme.colors.text
    },
    image: {
      width:256,
      height:256*0.127,
      marginBottom: 104-32,
    },
    textInput: {
      width:'75%', 
      fontSize: 16,
      color:theme.colors.text,
      borderWidth:1, 
      backgroundColor: theme.colors.card, 
      padding:16,
      marginHorizontal:12, 
      borderRadius:16, 
      marginBottom:8
    }
  }
)

export default Login

