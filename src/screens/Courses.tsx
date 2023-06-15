import { StyleSheet, FlatList, View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { text, theme } from '../constants/theme'
import CourseCard from '../components/Courses/CourseCard'
import { useStateContext } from '../context/StateContext'
import { useAuthContext } from '../context/AuthContext'
import { storefrontApiClient } from '../utils/storefrontApiClient'
import { CourseType } from '../types/firestoreTypes'

const Courses = () => {
  const { userToken } = useAuthContext()
  const { courses, setCourses, language } = useStateContext()
  const [isRefreshing, setIsRefreshing] = useState(false)
  //This is a workaround to solve following issue: large title remains collapsed at initial render.
  //Remove this if the issue is resolved.]
  const [showScrollView, setShowScrollView] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowScrollView(true)
    }, 0);
  }, [])

  const getAllowedCourses = async (isRefreshing: boolean = true) => {
    setIsRefreshing(isRefreshing)

    try {
      const query = `query getCustomerOrders($customerAccessToken: String!){
        customer(customerAccessToken: $customerAccessToken) {
          id
          tags
        }
      }`
      
      const variables = { customerAccessToken: userToken.accessToken }
  
      const response: any = await storefrontApiClient(query, variables)

      if (response.errors && response.errors.length != 0) {
        throw response.errors[0].message
      }

      const allowedCoursesIds = response.data.customer.tags 

      const coursesAugmented = courses.map((course) => ({ ...course, userAllowed: allowedCoursesIds.includes(course.id) } as CourseType) )
      setCourses(coursesAugmented)

    } catch (e) {
      console.log(e)
    }      

    setIsRefreshing(false)
  }

  useEffect(() => {
    getAllowedCourses(false)
  }, [])
  
  

  return (
    <>
      { showScrollView && 
        <>
          { courses.filter((course) => course.userAllowed ).length != 0 ?
            <FlatList
              data={courses.filter((course) => course.userAllowed )}
              renderItem={({item}) => <CourseCard data={item} /> }
              keyExtractor={item => item.id! }
              contentInsetAdjustmentBehavior='automatic'
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.container}
              refreshing={isRefreshing}
              onRefresh={getAllowedCourses}
            /> :
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: theme.colors.text, paddingTop: 40, fontSize: 16}}>{text[language].noCourses}</Text>
            </View>
          }
        </>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:14,
    paddingVertical:24
  },
  text: {
    color: theme.colors.text
  }
})

export default Courses