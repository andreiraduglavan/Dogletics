import { StyleSheet, View } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

const DificultyDots = ({dificulty, dotSize}: {dificulty: number, dotSize: number}) => {
  return (
    <View style={styles.dificultyContainer}>
        { [1,2,3].map((item) => (
            <Entypo name="dot-single" 
              size={dotSize} 
              color={ item<=dificulty ? theme.colors.primary : theme.colors.disabledText} 
              key={item} 
              style={{marginHorizontal:-6}} 
            />
          ))
        }
      </View>
  )
}

const styles = StyleSheet.create({
  dificultyContainer: {
    flexDirection:'row',
    marginTop:0
  },
})

export default DificultyDots