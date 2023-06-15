import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, ScrollView, Image, TextInput, Text, ActivityIndicator } from 'react-native'
import Button from '../components/Shared/Button';
import { text, theme } from '../constants/theme'
import { RootStackParamList } from '../types/navigationParams'
import logo from '../../assets/dogletics-logo.png'
import logoDark from '../../assets/dog-letics-logo-dark.png'
import { useState } from 'react';
import { useStateContext } from '../context/StateContext';
import { storefrontApiClient } from '../utils/storefrontApiClient';

export type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPassword = ({navigation}: Props) => {
  const { language } = useStateContext()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>()

  const resetPasswordButton = async () => {
    setLoading(true)
    setErrorMessage(null)

    try {
      // await sendPasswordResetEmail(auth, email)
      const query = `mutation recoverCustomerAccount($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            code
            field
            message
          }
        }
      }`

      const variables = { email }

      const response: any = await storefrontApiClient(query, variables)
      
      if (response.errors && response.errors.length != 0) {
        throw response.errors[0].message
      }
      
      if (response.data.customerRecover.customerUserErrors.length != 0) {
        console.log(response.data.customerRecover.customerUserErrors)
        throw response.data.customerRecover.customerUserErrors[0].message
      }

      navigation.push('PasswordForgotEmailSend')
    } catch (error: any) {
      typeof error === 'string' && setErrorMessage(error)
    }

    setLoading(false)
  }

  return (
    <ScrollView scrollEnabled={false}>
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

        { loading ? 
          <ActivityIndicator /> :
          <Button 
            title={text[language].resetPasswordButton} 
            onPress={resetPasswordButton}
            width='auto'
          />
        }

      <Text 
        style={{color:theme.colors.primary, fontWeight:'500', marginLeft:4, marginTop:64, fontSize:16}} 
        onPress={() => { navigation.navigate('Login')} }
      >
        {text[language].goBack} 
      </Text>

      </View>
    </ScrollView>
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
      marginBottom:24
    }
  }
)

export default ForgotPassword