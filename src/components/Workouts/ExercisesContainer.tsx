import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { theme } from '../../constants/theme'
import { Entypo } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutsStackParamList } from '../../types/navigationParams';
import { useNavigation } from '@react-navigation/native';
import { useStateContext } from '../../context/StateContext';

type Props = NativeStackScreenProps<WorkoutsStackParamList, 'Workout'>;

const ExercisesContainer = ({exercisesIds}: {exercisesIds: string[] }) => {
  const { exercises, language } = useStateContext()
  const navigation = useNavigation<Props['navigation']>()

  return (
    <View style={styles.card}>

      {exercises.filter((item) => exercisesIds.includes(item.id! || 'null')).map((item, index) => (
        <View style={ index!=exercises.filter((item) => exercisesIds.includes(item.id! || 'null')).length-1 ? styles.border : null } key={index}>
          <TouchableOpacity  
            onPress={() => navigation.push('Exercise', { data: item }) }
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
    shadowOpacity: 0.2,
    elevation: 0.8,
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

export default ExercisesContainer