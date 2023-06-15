import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native'
import { useEffect, useState } from 'react'
import { text, theme } from '../constants/theme'
import { Ionicons, Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { ProfileStackParamList } from '../types/navigationParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useStateContext } from '../context/StateContext';
import { useAuthContext } from '../context/AuthContext';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

const Profile = ({navigation}: Props) => {
  const { language } = useStateContext()
  const { userToken, signOut } = useAuthContext()

  //This is a workaround to solve following issue: large title remains collapsed at initial render.
  //Remove this if the issue is resolved.
  const [showScrollView, setShowScrollView] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowScrollView(true)
    }, 0)
  }, [])

  const deleteAccount = () => {
    Alert.alert(
      'Delete Account', 
      'Are you sure that you want to delete your account? Please note that there is no option to restore your account or its data. You would still be able to check your order status using its order number.',
      [
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => signOut()
        },
        { 
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <>
      { showScrollView && 
        <ScrollView 
          contentInsetAdjustmentBehavior='automatic'
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>

            <Text style={styles.name}>{`${userToken.customer.firstName} ${userToken.customer.lastName}`}</Text>

            <Text style={styles.subtitle}>{text[language].accountSettings}</Text>

            <View style={styles.card}>

              <View style={styles.border}>
                <TouchableOpacity onPress={() => navigation.push('PersonalInformations')}>
                  <View style={[styles.settingContainer]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Ionicons name="person-circle-outline" size={24} color={theme.colors.text} />
                      <Text style={styles.settingTitle}>{text[language].personalInformations}</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{}}>
                <TouchableOpacity onPress={() => navigation.push('ChangePassword')}>
                  <View style={[styles.settingContainer]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons name="key" size={24} color={theme.colors.text} />
                      <Text style={styles.settingTitle}>{text[language].changePassword}</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                  </View>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.border}>
                <TouchableOpacity>
                  <View style={[styles.settingContainer]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Ionicons name="refresh" size={24} color={theme.colors.text} />
                      <Text style={styles.settingTitle}>Subscriptions</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                  </View>
                </TouchableOpacity>
              </View> */}

              {/* <TouchableOpacity>
                <View style={styles.settingContainer}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons name="card" size={24} color={theme.colors.text} />
                    <Text style={styles.settingTitle}>Payment Methods</Text>
                  </View>
                  <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                </View>
              </TouchableOpacity> */}

            </View>

            <Text style={styles.subtitle}>{text[language].appSettings}</Text>

            <View style={styles.card}>

              {/* <View style={styles.border}>
                <TouchableOpacity>
                  <View style={[styles.settingContainer]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Octicons name="bell-fill" size={21} color={theme.colors.text} />
                      <Text style={styles.settingTitle}>{text[language].notifications}</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                  </View>
                </TouchableOpacity>
              </View> */}

              <View style={styles.border}>
                <TouchableOpacity onPress={() => navigation.push('Language') } >
                  <View style={[styles.settingContainer]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <MaterialIcons name="language" size={24} color={theme.colors.text} />
                      <Text style={[styles.settingTitle, {paddingLeft:9}]}>{text[language].language}</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => Linking.openURL('https://dogletics-8730.myshopify.com/policies/privacy-policy')}
              >
                <View style={ styles.settingContainer}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Entypo name="lock" size={22} color={theme.colors.text} />
                    <Text style={styles.settingTitle}>{text[language].privacy}</Text>
                  </View>
                  <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                </View>
              </TouchableOpacity>
              
            </View>

            <Text style={styles.subtitle}>{text[language].customerSupport}</Text>

            <View style={styles.card}>

              <View style={styles.border}>
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://dogletics-8730.myshopify.com/policies/terms-of-service')}
                >
                  <View style={[styles.settingContainer]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Entypo name="text-document" size={21} color={theme.colors.text} />
                      <Text style={styles.settingTitle}>{text[language].termsConditions}</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => Linking.openURL('https://dogletics-8730.myshopify.com/policies/contact-information')}
              >
                <View style={ styles.settingContainer}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Entypo name="phone" size={22} color={theme.colors.text} />
                    <Text style={styles.settingTitle}>{text[language].contact}</Text>
                  </View>
                  <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                </View>
              </TouchableOpacity>
              
            </View>
            
            <Text style={styles.subtitle}>{text[language].socialMedia}</Text>

            <View style={styles.card}>

              <View style={styles.border}>
                <TouchableOpacity>
                  <View style={[styles.settingContainer]}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Entypo name="instagram" size={21} color={theme.colors.text} />
                      <Text style={styles.settingTitle}>Instagram</Text>
                    </View>
                    <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity>
                <View style={ styles.settingContainer}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Entypo name="facebook" size={22} color={theme.colors.text} />
                    <Text style={styles.settingTitle}>Facebook</Text>
                  </View>
                  <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
                </View>
              </TouchableOpacity>
              
            </View>

            <Text style={styles.subtitle}>{text[language].deleteAccount}</Text>

            <View style={styles.card}>

              <TouchableOpacity
                onPress={deleteAccount}
              >
                <View style={ styles.settingContainer}>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <FontAwesome name="trash-o" size={24} color="red" />
                    <Text style={[styles.settingTitle, {color: 'red'}]}>{text[language].deleteAccount}</Text>
                  </View>
                  <Entypo name="chevron-small-right" size={24} color='red' />
                </View>
              </TouchableOpacity>
              
            </View>
            
          </View>
        </ScrollView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:14,
    paddingBottom:24
  },
  card : {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    width: '100%',
    shadowColor: 'black',
    shadowRadius: 2.5,
    elevation: 0.8,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
  },
  name: {
    color: theme.colors.infoText,
    fontSize: 18
  },
  subtitle: {
    color: theme.colors.infoText,
    fontSize: 14,
    marginTop:32,
    marginBottom:12,
    marginLeft:8
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
  }
})

export default Profile