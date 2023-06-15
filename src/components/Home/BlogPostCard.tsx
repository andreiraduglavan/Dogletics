import { useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native'
import { theme } from '../../constants/theme'
import { BlogpostType } from '../../types/firestoreTypes';
import { useStateContext } from '../../context/StateContext';

const BlogPostCard = ({data} : { data: BlogpostType} ) => {
  const { language } = useStateContext()
  const [loadingImage, setLoadingImage] = useState(false)
  
  return (
    <TouchableOpacity onPress={() => { data.language![language].linkTo!.includes('http') && Linking.openURL(data.language![language].linkTo!) }}>
      <View style={styles.blogCard}>
        <View style={{justifyContent:'center'}}>
          { loadingImage && <ActivityIndicator style={styles.activity} /> }
          <Image 
            source={{uri: `https://f003.backblazeb2.com/file/upwork-app/${data.image?.fileName}`}} 
            style={styles.image} 
            onLoadStart={ () => setLoadingImage(true) }
            onLoadEnd={ () => setLoadingImage(false) }
          />
        </View>
        <Text style={[styles.text, styles.textContainer]}>
          {data.language![language].title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontSize:16
  },
  blogCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    width: 160,
    marginLeft:14,
    shadowColor: 'black',
    shadowRadius: 2.5,
    elevation: 0.8,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
  },
  textContainer: {
    padding:8,
  },
  image: {
    width:160, 
    height:120, 
    borderTopLeftRadius:16, 
    borderTopRightRadius:16
  },
  activity: {
    alignSelf:'center',
    position:'absolute'
  }
})

export default BlogPostCard