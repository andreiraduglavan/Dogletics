import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { theme } from '../../constants/theme'
import { Entypo } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CoursesStackParamList } from '../../types/navigationParams';
import { useNavigation } from '@react-navigation/native';
import { LessonType } from '../../types/firestoreTypes';
import { useStateContext } from '../../context/StateContext';

type Props = NativeStackScreenProps<CoursesStackParamList, 'Course'>;

const LessonsContainer = ({lessonsIds}: {lessonsIds: string[]}) => {
  const { lessons, language } = useStateContext()
  const navigation = useNavigation<Props['navigation']>()

  return (
    <View style={styles.card}>

      {lessons.filter((item) => lessonsIds.includes(item.id!) ).map((item, index) => (
        <View style={index!=lessons.length-1 ? styles.border : null} key={item.id!} >
          <TouchableOpacity 
            onPress={() => navigation.push('Lesson', {data: item}) }
          >
            <View style={ styles.lessonContainer }>
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
    shadowOffset: {width: 0, height: 0},
    marginBottom:24,
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

export default LessonsContainer