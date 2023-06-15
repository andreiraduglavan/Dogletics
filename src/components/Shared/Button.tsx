import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native'
import { theme } from '../../constants/theme'

const Button = ({title, onPress, width}: {title: string, width: any, onPress: (event: GestureResponderEvent) => void}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, {width: width}]}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    //width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical:12,
    paddingHorizontal:40,
    borderRadius:100,
    shadowColor: theme.colors.primary,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    alignSelf:'center',
    alignItems:'center',
  },
  text: {
    color: theme.colors.onPrimary,
    fontSize:18,
    fontWeight:'600'
  }
})

export default Button