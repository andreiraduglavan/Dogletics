import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { text, theme } from '../constants/theme'
import { AntDesign } from '@expo/vector-icons';
import germanFlag from '../../assets/german-flag.png'
import ukFlag from '../../assets/uk-flag.png'
import { useStateContext } from '../context/StateContext';

const Language = () => {
  const { language, setLanguage } = useStateContext()

  return (
    <ScrollView 
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>

        <Text style={styles.subtitle}>{text[language].changeLanguage} </Text>

        <View style={styles.card}>

          <View style={styles.border}>
            <TouchableOpacity onPress={() => setLanguage('en') }>
              <View style={[styles.settingContainer]}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image
                    source={ukFlag} 
                    style={styles.image} 
                  />
                  <Text style={styles.settingTitle}>{text[language].english} </Text>
                </View>
                { language == 'en' &&
                  <AntDesign name="check" size={24} color={theme.colors.primary} /> 
                }
              </View>
            </TouchableOpacity>
          </View>

          <View style={{}}>
            <TouchableOpacity onPress={() => { setLanguage('de') } }>
              <View style={[styles.settingContainer]}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Image
                    source={germanFlag} 
                    style={styles.image} 
                  />
                  <Text style={styles.settingTitle}>{text[language].german} </Text>
                </View>
                { language == 'de' &&
                  <AntDesign name="check" size={24} color={theme.colors.primary} /> 
                }
              </View>
            </TouchableOpacity>
          </View>

        </View>
        
      </View>
    </ScrollView>
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
  },
  image: {
    width:34,
    height:34 
  },
})

export default Language