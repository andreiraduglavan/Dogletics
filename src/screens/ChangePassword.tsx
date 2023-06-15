import { View, Text, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { text, theme } from '../constants/theme'
import Button from '../components/Shared/Button'
import * as SecureStore from 'expo-secure-store'
import { useStateContext } from '../context/StateContext'
import { useAuthContext } from '../context/AuthContext'
import { storefrontApiClient } from '../utils/storefrontApiClient'

const ChangePassword = () => { 
  const { language } = useStateContext()
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [succesMessage, setSuccesMessage] = useState<string | null>(null)
  const { userToken, dispatch } = useAuthContext()

  const resetPassword = async () => {
    setLoading(true)
    setErrorMessage(null)
    setSuccesMessage(null)

    if (verifyPassword != password) {
      setErrorMessage('Please make sure that passwords match. Try again.')
      setLoading(false)
      return
    }

    try {
      const query = `mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
          customer {
            id
            firstName
            lastName
            acceptsMarketing
            email
            phone
          }
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }`

      const variables = {
        customerAccessToken: userToken.accessToken,
        customer: {
          password
        }
      }

      const response: any = await storefrontApiClient(query, variables)

      if (response.errors && response.errors.length != 0) {
        throw response.errors[0].message
      }
      
      if (response.data.customerUpdate.customerUserErrors.length != 0) {
        console.log(response.data.customerUpdate.customerUserErrors)
        throw response.data.customerUpdate.customerUserErrors[0].message
      }

      var newToken = response.data.customerUpdate.customerAccessToken
      newToken.customer = response.data.customerUpdate.customer
      
      SecureStore.setItemAsync('userToken', JSON.stringify(newToken) )
      dispatch({ type: 'RESTORE_TOKEN', token: newToken });


      setSuccesMessage('Your personal informations has been updated successfully.')
    } catch (error: any) {
      typeof error === 'string' && setErrorMessage(error)
    }

    setLoading(false)
  }
  

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={false}>
      <Text style={styles.subtitle}>{text[language].changePassword} </Text>
      
        {/* <TextInput
          placeholder={text[language].oldPassword}  
          placeholderTextColor={theme.colors.infoText} 
          secureTextEntry={true} 
          style={[styles.textInput, { marginBottom:8 }]} 
          onChangeText={text => setOldPassword(text) } 
          autoCapitalize={'none'} 
          value={oldPassword}
        /> */}
        <TextInput
          placeholder={text[language].newPassword}  
          placeholderTextColor={theme.colors.infoText} 
          secureTextEntry={true} 
          style={[styles.textInput, { marginBottom:8 }]} 
          onChangeText={text => setPassword(text) } 
          autoCapitalize={'none'} 
          value={password}
        />
        <TextInput 
          placeholder={text[language].confirmNewPassword} 
          placeholderTextColor={theme.colors.infoText} 
          secureTextEntry={true} 
          style={[styles.textInput, { marginBottom:24 }]} 
          onChangeText={text => setVerifyPassword(text) } 
          autoCapitalize={'none'} 
          value={verifyPassword}
        />

        { errorMessage ?
          <View style={{height:32}}>
            <Text style={{color:'red'}}>{errorMessage}</Text>
          </View> :
          <View style={{height:32}}><Text style={{color:theme.colors.background}}>peco</Text></View>
        }

        { loading ? 
          <ActivityIndicator /> :
          <>
            {
              succesMessage ?
              <Text style={styles.succesMessage}>{succesMessage}</Text> :
              <Button 
                title={text[language].changePasswordButton}  
                onPress={resetPassword}
                width='100%'
              />
            } 
          </>
        }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:14,
    paddingBottom:24,
    alignItems: 'center'
  },
  card : {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    width: '100%',
    shadowColor: 'black',
    shadowRadius: 2.5,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
  },
  name: {
    color: theme.colors.infoText,
    fontSize: 18
  },
  subtitle: {
    color: theme.colors.infoText,
    alignSelf: 'flex-start',
    fontSize: 14,
    marginTop:32,
    marginBottom:12,
    marginLeft:6
  },
  settingTitle: {
    color: theme.colors.text,
    fontSize:18,
    paddingLeft:12
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16
  },
  border: {
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
  },
  textInput: {
    width:'100%', 
    fontSize: 16,
    color:theme.colors.text,
    borderWidth:1, 
    backgroundColor: theme.colors.card, 
    padding:16,
    marginHorizontal:12, 
    borderRadius:16, 
    marginBottom:8
  },
  succesMessage: {
    marginTop:6,
    color: theme.colors.primary,
    fontSize: 16,
    textAlign: 'center',
  }
})

export default ChangePassword