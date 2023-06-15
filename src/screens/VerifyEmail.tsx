import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native'
import { theme } from '../constants/theme'
import { RootStackParamList } from '../types/navigationParams'
import logo from '../../assets/dogletics-logo.png'
import logoDark from '../../assets/dog-letics-logo-dark.png'

export type Props = NativeStackScreenProps<RootStackParamList, 'VerifyEmail'>;

const VerifyEmail = ({navigation, route}: Props) => {
  const { message } = route.params
  return (
    <ScrollView scrollEnabled={false}>
      <View style={styles.container} >
        <Image source={theme.dark ? logoDark : logo} style={styles.image}/>
        
        <Text style={styles.text}>{message} Then login to your account.</Text>

        <Text 
          style={{color:theme.colors.primary, fontWeight:'500', marginLeft:4, marginTop:64, fontSize:16}} 
          onPress={() => { navigation.navigate('Login')} }
        >
          Go back to login 
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
      color: theme.colors.text,
      paddingHorizontal:32,
      fontSize:16,
      textAlign: 'center'
    },
    image: {
      width:256,
      height:256*0.127,
      marginBottom: 128,
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

export default VerifyEmail