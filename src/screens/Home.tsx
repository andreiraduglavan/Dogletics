import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image, Linking } from 'react-native'
import { text, theme } from '../constants/theme'
import BlogPostCard from '../components/Home/BlogPostCard'
import { useEffect, useState } from 'react'
import HomeCourseCard from '../components/Home/HomeCourseCard'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../types/navigationParams'
import HomeWorkoutCard from '../components/Home/HomeWorkoutCard'

import { useStateContext } from '../context/StateContext'
import { shuffleArray } from '../utils/shuffleArray'

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const Home = ({navigation, route}: Props) => {
  const { language } = useStateContext()
  
  //This is a workaround to solve following issue: large title remains collapsed at initial render.
  //Remove this if the issue is solved.
  const [showScrollView, setShowScrollView] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowScrollView(true)
    }, 0);
  }, [])
  const { courses, workouts, salesBanners, blogposts } = useStateContext()
  return (
    <>
      { showScrollView &&
        <ScrollView 
          contentInsetAdjustmentBehavior='automatic'
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container} >
            {/* <View style={[styles.titleContainer, {marginTop:24}]}>
              <Text style={[styles.text, styles.title]}>{text[language].featuredCourses}</Text>
              <TouchableOpacity onPress={() => navigation.push('Courses')}>
                <Text style={styles.button}>{text[language].seeMore}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={shuffleArray(courses).slice(0, 5)}
              renderItem={({item}) => (<HomeCourseCard data={item} />)}
              keyExtractor={(item) => item.id! }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              snapToInterval={300}
              decelerationRate='fast'
              style={{marginHorizontal:-14}}
              contentContainerStyle={{paddingRight:14, paddingVertical:24}}
            /> */}

            <View style={[styles.titleContainer, {marginTop: 24}]}>
              <Text style={[styles.text, styles.title]}>{text[language].featuredWorkouts}</Text>
              <TouchableOpacity onPress={() => navigation.push('Workouts')}>
                <Text style={styles.button}>{text[language].seeMore}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={shuffleArray(workouts).slice(0,5)}
              renderItem={({item}) => (<HomeWorkoutCard data={item} />)}
              keyExtractor={(item) => item.id! }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              snapToInterval={300}
              decelerationRate='fast'
              style={{marginHorizontal:-14}}
              contentContainerStyle={{paddingRight:14, paddingVertical:24}}
            />

            <View style={[styles.titleContainer]}>
              <Text style={[styles.text, styles.title]}>{text[language].sales}</Text>
            </View>

            <FlatList
              data={salesBanners}
              renderItem={({item, index}) => ( 
                <TouchableOpacity onPress={() => item.language![language].linkTo?.includes('http') && Linking.openURL(item.language![language].linkTo!)} key={index}>
                  <View style={styles.salesCard}>
                    <Image  
                      source={{uri: `https://f003.backblazeb2.com/file/upwork-app/${item.image?.fileName}`}} 
                      style={styles.image} 
                    />
                  </View>
                </TouchableOpacity> 
              )}
              keyExtractor={(item) => item.id! }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate='normal'
              style={{marginHorizontal:-14}}
              contentContainerStyle={{paddingRight:14, paddingVertical:24}}
            />

            <View style={[styles.titleContainer]}>
              <Text style={[styles.text, styles.title]}>{text[language].blogPosts}</Text>
              <TouchableOpacity onPress={() => Linking.openURL('https://peachonaleash.com/')} >
                <Text style={styles.button}>{text[language].seeMore}</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={shuffleArray(blogposts).slice(0, 5)}
              renderItem={({item}) => (<BlogPostCard data={item} />)}
              keyExtractor={(item) => item.id! }
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate='normal'
              style={{marginHorizontal:-14}}
              contentContainerStyle={{paddingRight:14, paddingVertical:24}}
            />

          </View>
        </ScrollView>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:16,
    paddingBottom:8
  },
  titleContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'flex-end',
  },
  headerContainer: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:20,
    paddingBottom:32,
    paddingHorizontal:2
  },
  text: {
    color: theme.colors.text,
    fontSize:16
  },
  button: {
    color: theme.colors.primary,
    fontSize:16
  },
  title: {
    fontSize:24,
    fontWeight:'600'
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    height: 120,
    width: 300,
    marginLeft:14,
    shadowColor: 'black',
    shadowRadius: 2.5,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0}
  },
  salesCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    height: 125,
    width: 125,
    marginLeft:14,
    shadowColor: 'black',
    shadowRadius: 3.5,
    elevation: 1.6,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
  },
  image:{
    borderRadius: 16,
    height: 125,
    width: 125,
  },
  textContainer: {
    padding:8,
  }
})

export default Home
