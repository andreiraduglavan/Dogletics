import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { theme } from '../../constants/theme'
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/navigationParams';
import { useNavigation } from '@react-navigation/native';
import DificultyDots from '../Courses/DificultyDots';
import { CourseType } from '../../types/firestoreTypes';
import { useStateContext } from '../../context/StateContext';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const HomeCourseCard = ({data} : { data: CourseType}) => {
  const { language } = useStateContext()
  const navigation = useNavigation<Props['navigation']>()
  const [loadingImage, setLoadingImage] = useState(false)

  return (
    <TouchableOpacity onPress={() => navigation.push('Course', { data }) }>
      <View style={styles.card}>
      <View style={{justifyContent:'center'}}>
          { loadingImage && <ActivityIndicator style={styles.activity} /> }
          <Image 
            source={{uri: `https://f003.backblazeb2.com/file/upwork-app/${data.image?.fileName}`}} 
            style={styles.image} 
            onLoadStart={ () => setLoadingImage(true) }
            onLoadEnd={ () => setLoadingImage(false) }
          />
        </View>
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
  image: {
    width:120, 
    height:120, 
    borderRadius:14
  },
  contentContainer: {
    width:180,
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
  activity: {
    alignSelf:'center',
    position:'absolute'
  }
})

export default HomeCourseCard