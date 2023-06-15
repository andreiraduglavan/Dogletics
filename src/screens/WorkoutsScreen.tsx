import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { theme } from '../constants/theme'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { WorkoutsStackParamList } from '../types/navigationParams'
import Workouts from '../components/Workouts/Workouts'
import Exercises from '../components/Workouts/Exercises';

type Props = NativeStackScreenProps<WorkoutsStackParamList, 'Workouts'>;

const WorkoutsScreen = ({ navigation }: Props) => {
  //This is a workaround to solve following issue: large title remains collapsed at initial render.
  //Remove this if the issue is resolved.
  const [showScrollView, setShowScrollView] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowScrollView(true)
    }, 0)
    
  }, [])

  const [selectedTab, setSelectedTab] = useState(0)
  useEffect(() => {
    navigation.setOptions({
      title: ['Workouts', 'Exercises'][selectedTab]
    })
  }, [selectedTab])

  

  return (
    <>
      { showScrollView && 
        <>
          { selectedTab == 0 ?
            <Workouts selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> :
            <Exercises selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          }
        </>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:14,
    paddingBottom: 24,
    paddingTop:6
  },
  text: {
    color: theme.colors.text
  }
})

export default WorkoutsScreen