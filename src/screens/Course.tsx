import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { text, theme } from '../constants/theme'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CoursesStackParamList } from '../types/navigationParams';
import DificultyDots from '../components/Courses/DificultyDots';
import Button from '../components/Shared/Button';
import VideoPlayer from '../components/Courses/VideoPlayer';
import LessonsContainer from '../components/Courses/LessonsContainer';
import { useStateContext } from '../context/StateContext';

type Props = NativeStackScreenProps<CoursesStackParamList, 'Course'>;

const Course = ({navigation, route}: Props) => {
  const data = route.params.data
  const { language } = useStateContext()

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

            <Text style={[styles.text, styles.title]}>{text[language].overview}</Text>
            <Text style={[styles.text, {marginVertical:24, fontSize:16}]}>
              {data.language![language].overview}
            </Text>
            
            { data.userAllowed ?
              <LessonsContainer lessonsIds={data.lessons!} /> :
              <Button 
                title={text[language].buyCourseButton}
                width='100%'
                onPress={() => {}} 
              />
            }
            
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
    marginTop:24
  },
  cardsContainer : {
    flexDirection: 'row',
    marginRight:-14,
    marginTop:24
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

export default Course