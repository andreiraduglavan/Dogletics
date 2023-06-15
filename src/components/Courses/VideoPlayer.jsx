import { Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { theme } from '../../constants/theme'
import * as FileSystem from 'expo-file-system'

const screenWidth = Dimensions.get('window').width

const VideoPlayer = ({url}) => {
  const cacheDir = FileSystem.cacheDirectory
  const fileName = url.split('https://f003.backblazeb2.com/file/upwork-app/')[1]

  const video = useRef(null)
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(true)
  const [videoSource, setVideoSource] = useState(cacheDir+fileName)

  useEffect(() => {
    const cacheVideo = async () => {
      const fileInfo = await FileSystem.getInfoAsync(cacheDir+fileName)
      
      if( !fileInfo.exists ) {
        setVideoSource(url)
        FileSystem.downloadAsync(url, cacheDir+fileName)
      }
  
    }
    
    cacheVideo()
  }, [])

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{uri: videoSource }}
        useNativeControls
        resizeMode="contain"
        onLoad={() => setLoading(false) }
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(status)}
      />
      { loading &&
        <ActivityIndicator style={styles.activity}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark ? theme.colors.card : 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16
  },
  activity: {
    position: 'absolute'
  },
  video: {
    flex: 1,
    width: screenWidth-28,
    height: screenWidth*9/16,
    borderRadius:16
  },
  buttons: {
    margin: 16
  }
});

export default VideoPlayer