import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { theme } from '../../constants/theme'
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WorkoutsStackParamList } from '../../types/navigationParams';
import { useNavigation } from '@react-navigation/native';
import DificultyDots from '../Courses/DificultyDots';
import { ExerciseType } from '../../types/firestoreTypes';
import { useStateContext } from '../../context/StateContext';

const screenWidth = Dimensions.get('window').width

type Props = NativeStackScreenProps<WorkoutsStackParamList, 'Workouts'>;

const ExerciseCard = ({data}: {data: ExerciseType}) => {
  const { language, equipments } = useStateContext()
  const navigation = useNavigation<Props['navigation']>()

  return (
    <TouchableOpacity onPress={() => navigation.push('Exercise', { data }) }>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.title]}>{data.language![language].title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{data.duration} min</Text>
            <Text style={styles.dot}>・</Text>
            <DificultyDots  dificulty={data.dificulty!} dotSize={20} />
            <Text style={styles.dot}>・</Text>
            <Text style={styles.infoText}>
              { 
                equipments
                .filter((item) => data.equipments?.includes(item.id!) )
                .map((item) => item.language![language].title )
                .join(', ')
              }
            </Text>
          </View>
        </View>
        <Entypo name="chevron-small-right" size={26} color={theme.colors.infoText} style={styles.chevron} />
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
    marginHorizontal:14,
    padding:12,
    borderRadius: 16,
    width: screenWidth-28,
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

export default ExerciseCard