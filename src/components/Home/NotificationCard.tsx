import { View, Text, StyleSheet, Dimensions, Linking } from 'react-native'
import React from 'react'
import { theme } from '../../constants/theme'
import { NotificationType } from '../../types/firestoreTypes'
import { Entypo } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const NotificationCard = ({data}: {data: NotificationType}) => {
  return (
    <TouchableOpacity onPress={() => {data.url.includes('http') && Linking.openURL(data.url)} }>
      <View style={styles.card}>
        <View style={{flexDirection:'column'}}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.text}>{data.body}</Text>
        </View>
        <Entypo name="chevron-small-right" size={24} color={theme.colors.infoText} />
      </View>
    </TouchableOpacity>
  )
}

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:12,
    padding:12,
    borderRadius: 16,
    width: screenWidth-28,
    shadowColor: 'black',
    shadowRadius: 2.5,
    elevation: 0.8,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0}
  },
  title: {
    color: theme.colors.text,
    fontSize:18,
    fontWeight:'700',
    marginBottom:12
  },
  text: {
    color: theme.colors.text,
    fontSize:16
  },
})

export default NotificationCard