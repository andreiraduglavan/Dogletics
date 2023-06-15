import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import { theme } from '../../constants/theme'
import { Entypo } from '@expo/vector-icons'
import { EquipmentType } from '../../types/firestoreTypes';
import { useStateContext } from '../../context/StateContext';

const EquipmentContainer = ({equipmentList}: {equipmentList: EquipmentType[] }) => {
  const { language } = useStateContext()

  return (
    <View style={styles.card}>

      {equipmentList.map((item, index) => (
        <View style={ index!=equipmentList.length-1 ? styles.border : null } key={index}>
          <TouchableOpacity  
            onPress={() => item.language![language].linkTo?.includes('http') && Linking.openURL(item.language![language].linkTo || 'https://fitpawsusa.com/product/caninegym-agility-kit/') }
          >
            <View style={styles.lessonContainer}>
              <Text style={styles.lessonTitle}>{item.language![language].title}</Text>
              <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
            </View>
          </TouchableOpacity>
        </View>
      ))}

    </View>
  )
}

const styles = StyleSheet.create({
  card : {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    width: '100%',
    shadowColor: 'black',
    shadowRadius: 2.5,
    elevation: 0.8,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0}
  },
  lessonTitle: {
    color: theme.colors.text,
    fontSize:18,
  },
  lessonContainer: {
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

export default EquipmentContainer