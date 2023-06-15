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

export type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({navigation}: Props) => {
  const { language } = useStateContext()
  const { signUp } = useAuthContext()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const signUpButton = async () => {
    setLoading(true)
    setErrorMessage(null)

    if (verifyPassword != password) {
      setErrorMessage('Please make sure that passwords match. Try again.')
      setLoading(false)
      return
    }

    try {
      await signUp(firstName, lastName, email, password)
    } catch (error: any) {
      error.code === 'CUSTOMER_DISABLED' && navigation.push('VerifyEmail', { message: error.message })
      typeof error.message === 'string' && setErrorMessage(error.message)
    }

    setLoading(false)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'position' : 'height'}>
      <ScrollView scrollEnabled={Platform.OS == 'ios' ? false : true}>
        <View style={styles.container} >
          <Image source={theme.dark ? logoDark : logo} style={styles.image}/>

          { errorMessage ?
            <View style={{height:32}}>
              <Text style={{color:'red'}}>{errorMessage}</Text>
            </View> :
            <View style={{height:32}}><Text style={{color:theme.colors.background}}>peco</Text></View>
          }

          <TextInput 
            placeholder={text[language].firstName}
            placeholderTextColor={theme.colors.infoText} 
            style={styles.textInput} 
            onChangeText={text => setFirstName(text) } 
            autoCapitalize={'words'} 
            value={firstName}
          />
          <TextInput 
            placeholder={text[language].lastName}
            placeholderTextColor={theme.colors.infoText} 
            style={styles.textInput} 
            onChangeText={text => setLastName(text) } 
            autoCapitalize={'words'} 
            value={lastName}
          />
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
            style={[styles.textInput, { marginBottom:8 }]} 
            onChangeText={text => setPassword(text) } 
            autoCapitalize={'none'} 
            value={password}
          />
          <TextInput 
            placeholder={text[language].confirmPassword} 
            placeholderTextColor={theme.colors.infoText} 
            secureTextEntry={true} 
            style={[styles.textInput, { marginBottom:24 }]} 
            onChangeText={text => setVerifyPassword(text) } 
            autoCapitalize={'none'} 
            value={verifyPassword}
          />

          { loading ? 
            <ActivityIndicator /> :
            <Button 
              title={text[language].signUp} 
              onPress={signUpButton}
              width='auto'
            />
          }

          <Text style={{marginVertical: 24, color:theme.colors.infoText}}>
            {text[language].alreadyAccountQ} 
            <Text 
              style={{color:theme.colors.primary, fontWeight:'500', marginLeft:4}} 
              onPress={() => { navigation.navigate('Login')} }
            >
              {' '}{text[language].login} 
            </Text>
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
      paddingTop: 96,
    },
    text: {
      color: theme.colors.text
    },
    image: {
      width:256,
      height:256*0.127,
      marginBottom: 24,
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

export default SignUp