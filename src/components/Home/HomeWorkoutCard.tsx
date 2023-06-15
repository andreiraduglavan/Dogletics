import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { theme } from '../../constants/theme'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutsStackParamList } from '../../types/navigationParams';
import { useNavigation } from '@react-navigation/native';
import DificultyDots from '../Courses/DificultyDots';
import { WorkoutType } from '../../types/firestoreTypes';
import { useStateContext } from '../../context/StateContext';

const screenWidth = Dimensions.get('window').width

type Props = NativeStackScreenProps<WorkoutsStackParamList, 'Workouts'>;

const HomeWorkoutCard = ({data} : { data: WorkoutType}) => {
  const { language } = useStateContext()
  const navigation = useNavigation<Props['navigation']>()

  return (
    <TouchableOpacity onPress={() => navigation.push('Workout', { data }) }>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.title]}>{data.language![language].title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{data.duration} min</Text>
            <Text style={styles.dot}>・</Text>
            <DificultyDots  dificulty={data.dificulty!} dotSize={20} />
          </View>
        </View>
        {/* <Entypo name="chevron-small-right" size={26} color={theme.colors.infoText} style={styles.chevron} /> */}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontSize:16
  },
  title: {
    fontSize:22,
    fontWeight:'600'
  },
  card: {
    backgroundColor: theme.colors.card,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginBottom:12,
    marginLeft:14,
    padding:12,
    borderRadius: 16,
    width: 300,
    shadowColor: 'black',
    shadowRadius: 2.5,
    elevation: 0.8,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0}
  },
  contentContainer: {
    paddingHorizontal:12,
  },
  chevron: {
    alignSelf: 'center'
  },
  infoContainer: {
    flexDirection:'row',
    alignItems:'center',
    marginTop:8,
  },
  infoText : {
    color: theme.colors.infoText,
  },
  dot: {
    color: theme.colors.infoText,
    fontSize:20,
  },
  dificultyContainer: {
    flexDirection:'row'
  },
})

export default HomeWorkoutCard