import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { theme } from '../constants/theme'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CoursesStackParamList } from '../types/navigationParams'
import VideoPlayer from '../components/Courses/VideoPlayer'
import { useStateContext } from '../context/StateContext'

type Props = NativeStackScreenProps<CoursesStackParamList, 'Lesson'>

const Lesson = ({ navigation, route }: Props) => {
  const { language } = useStateContext()
  const data = route.params.data

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
      title: data.language![language].title
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
            
            <VideoPlayer url={`https://f003.backblazeb2.com/file/upwork-app/${data.video?.fileName}`} />

            <Text style={[styles.text, styles.title]}>Description</Text>
            <Text style={[styles.text, {marginVertical:24, fontSize:16}]}>
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
  title: {
    fontSize:24,
    fontWeight:'600',
    marginTop:24
  }
})

export default Lesson