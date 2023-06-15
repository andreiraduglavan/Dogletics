import { View, Text, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { text, theme } from '../constants/theme'
import Button from '../components/Shared/Button'
import * as SecureStore from 'expo-secure-store'
import { useStateContext } from '../context/StateContext'
import { useAuthContext } from '../context/AuthContext'
import { storefrontApiClient } from '../utils/storefrontApiClient'

const PersonalInformations = () => { 
  const { userToken, dispatch } = useAuthContext()
  const { language } = useStateContext()
  const [email, setEmail] = useState(userToken.customer?.email || '')
  const [firstName, setFirstName] = useState(userToken.customer?.firstName || '')
  const [lastName, setLastName] = useState(userToken.customer?.lastName || '')
  const [phone, setPhone] = useState(userToken.customer?.phone || '')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [succesMessage, setSuccesMessage] = useState<string | null>(null)

  const changeInfo = async () => {
    setLoading(true)
    setErrorMessage(null)
    setSuccesMessage(null)

    if (firstName=='') {
      setErrorMessage("First Name field shouldn't be empty")
      setLoading(false)
      return
    }

    if (lastName=='') {
      setErrorMessage("Last Name field shouldn't be empty")
      setLoading(false)
      return
    }

    if (!email.includes('@') && !email.includes('.')) {
      console.log(email)
      setErrorMessage('Enter a valid email.')
      setLoading(false)
      return
    }

    try {
      // await updateEmail(user!, user!.email! )
      // await updateProfile(auth.currentUser!, {displayName: name})
      // await setDoc(doc(db, 'users', user?.uid! ), {email, name})

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
          customerUserErrors {
            code
            field
            message
          }
        }
      }`

      const variables = phone != "" ? {
        customerAccessToken: userToken.accessToken,
        customer: {
          lastName,
          firstName,
          phone,
          email
        }
      } : 
      {
        customerAccessToken: userToken.accessToken,
        customer: {
          lastName,
          firstName,
          email
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

      var newToken = userToken
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
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>    
      <Text style={styles.subtitle}>{text[language].firstName} </Text>   
      <TextInput
        placeholder={text[language].firstName} 
        placeholderTextColor={theme.colors.infoText} 
        style={styles.textInput} 
        onChangeText={text => setFirstName(text) } 
        autoCapitalize={'words'} 
        value={firstName}
      />

      <Text style={styles.subtitle}>{text[language].lastName} </Text>   
      <TextInput
        placeholder={text[language].firstName} 
        placeholderTextColor={theme.colors.infoText} 
        style={styles.textInput} 
        onChangeText={text => setLastName(text) } 
        autoCapitalize={'words'} 
        value={lastName}
      />

      <Text style={styles.subtitle}>Phone</Text>   
      <TextInput
        placeholder='Phone'
        textContentType='telephoneNumber'
        placeholderTextColor={theme.colors.infoText} 
        style={styles.textInput} 
        onChangeText={text => setPhone(text) } 
        autoCapitalize={'words'} 
        value={phone}
      />

      <Text style={[styles.subtitle, {marginTop:12}]}>{text[language].email}</Text>
      <TextInput
        placeholder={text[language].email} 
        textContentType='emailAddress'
        placeholderTextColor={theme.colors.infoText} 
        style={[styles.textInput, { marginBottom:8 }]} 
        onChangeText={text => setEmail(text) } 
        autoCapitalize={'none'} 
        value={email}
      />

      { errorMessage ?
        <View style={{height:32}}>
          <Text style={{color:'red'}}>{errorMessage}</Text>
        </View> :
        <View style={{height:32}}><Text style={{color:theme.colors.background}}>peco</Text></View>
      }
      
      <View style={{paddingBottom:156, width:'100%'}}>
        { loading ? 
          <ActivityIndicator /> :
          <>
            {
              succesMessage ?
              <Text style={styles.succesMessage}>{succesMessage}</Text> :
              <Button 
                title={text[language].changeButton}  
                onPress={changeInfo}
                width='100%'
              />
            } 
          </>
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex:1,
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
    marginTop:12,
    marginBottom:8,
    marginLeft:6,
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
    marginBottom:0
  },
  succesMessage: {
    marginTop:6,
    color: theme.colors.primary,
    fontSize: 16,
    textAlign: 'center',
  }
})

export default PersonalInformations