import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { text, theme } from '../constants/theme'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {  WorkoutsStackParamList } from '../types/navigationParams'
import DificultyDots from '../components/Courses/DificultyDots'
import EquipmentContainer from '../components/Workouts/EquipmentContainer'
import ExercisesContainer from '../components/Workouts/ExercisesContainer'
import { useStateContext } from '../context/StateContext'

type Props = NativeStackScreenProps<WorkoutsStackParamList, 'Workout'>

const Workout = ({navigation, route}: Props) => {
  const data = route.params.data
  const { exercises: allExercises, equipments: allEquipments, language } = useStateContext()
  
  //get a list of the exercises of this workout, because data.exercises contains just the ids
  const exercises = allExercises.filter((item) => data.exercises.includes(item.id!))
  
  //get a list of all the equipments ids required for every exercise the workout contains
  var equipmentsIds = exercises.map((item) => item.equipments ).flat()

  // remove duplicates
  equipmentsIds = equipmentsIds.filter((item, index) => equipmentsIds.indexOf(item) === index )

  //get equipments from ids
  const equipments = allEquipments.filter((item) => equipmentsIds.includes(item.id!))


  //This is a workaround to solve following issue: large title remains collapsed at initial render.
  //Remove this if the issue is resolved.
  const [showScrollView, setShowScrollView] = useState(false)
  useEffect(() => {
    //remove just setShowScrollView
    setTimeout(() => {
      setShowScrollView(true)
    }, 0)

    //what is below has nothing to do with the workaround, this must remain.
    navigation.setOptions({
      title:data.language![language].title
    })
  }, [])
  

  return (
    <>
      { showScrollView && 
        <ScrollView 
          contentInsetAdjustmentBehavior='automatic'
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <View style={styles.container}>
            
            {/* <VideoPlayer /> */}
            
            <View style={styles.cardsContainer}>
              <View style={styles.smallCard}>
                <Text style={[styles.text, styles.cardTitle]}>{text[language].duration}</Text>
                <Text style={styles.infoText}>{data.duration} min</Text>
              </View>
              <View style={styles.smallCard}>
                <Text style={[styles.text, styles.cardTitle, {marginBottom:10}]}>{text[language].dificulty}</Text>
                <DificultyDots dificulty={data.dificulty!} dotSize={26}/>
              </View>
            </View>

            <Text style={[styles.text, styles.title]}>{text[language].duration}</Text>
            <ExercisesContainer exercisesIds={data.exercises!} />

            <Text style={[styles.text, styles.title]}>{text[language].equpmentsRequired}</Text>
            <EquipmentContainer equipmentList={equipments} />

            <Text style={[styles.text, styles.title]}>{text[language].description}</Text>
            <Text style={[styles.text, { fontSize:16}]}>
              {data.language![language].description}
            </Text>


          </View>

        </ScrollView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:7,
    paddingTop: 7,
    paddingBottom:24,
  },
  text: {
    color: theme.colors.text,
  },
  infoText: {
    color: theme.colors.infoText,
    fontSize:20,
    marginTop:8,
  },
  cardTitle: {
    fontSize:22,
    fontWeight:'600',
  },
  title: {
    fontSize:24,
    fontWeight:'600',
    marginVertical:24
  },
  cardsContainer : {
    flexDirection: 'row',
    marginRight:-14,
    marginTop:0
  },
  smallCard: {
    height:90,
    backgroundColor: theme.colors.card,
    flex:1,
    marginRight:14,
    borderRadius:16,
    padding:12,
    shadowColor: 'black',
    shadowRadius: 2.5,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
  }
})

export default Workout