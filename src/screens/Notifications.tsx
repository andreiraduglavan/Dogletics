import { FlatList, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { theme } from '../constants/theme'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../types/navigationParams'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/clientApp'
import { NotificationType } from '../types/firestoreTypes'
import NotificationCard from '../components/Home/NotificationCard'

type Props = NativeStackScreenProps<HomeStackParamList, 'Notifications'>;

const Notifications = ({ navigation }: Props) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  //This is a workaround to solve following issue: large title remains collapsed at initial render.
  //Remove this if the issue is resolved.
  const [showScrollView, setShowScrollView] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowScrollView(true)
    }, 0)
    
  }, [])

  const getNotifications = async () => {
    setIsRefreshing(true)
    var notifications: NotificationType[] = []

    const querySnapshot = await getDocs(query(collection(db, "notifications"), orderBy('createdAt', 'desc'), limit(16)));
    querySnapshot.forEach((doc) => {
      notifications.push({id: doc.id, ...doc.data() } as NotificationType)       
    });

    setNotifications(notifications)
    setIsRefreshing(false)
  }

  useEffect(() => {
    getNotifications()   
  }, [])

  return (
    <>
      { showScrollView && 
        <FlatList
          data={notifications}
          renderItem={({item}) => <NotificationCard data={item} /> }
          keyExtractor={item => item.id! }
          contentInsetAdjustmentBehavior='automatic'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          refreshing={isRefreshing}
          onRefresh={getNotifications}
        />
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

export default Notifications