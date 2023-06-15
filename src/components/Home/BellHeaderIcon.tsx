import { TouchableOpacity } from 'react-native'
import { theme } from '../../constants/theme'
import { Octicons } from '@expo/vector-icons'
import { HomeStackParamList } from '../../types/navigationParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

const BellHeaderIcon = () => {
  const navigation = useNavigation<Props['navigation']>()

  return (
    <TouchableOpacity onPress={() => navigation.push('Notifications') } >
      <Octicons name="bell-fill" 
        size={22} 
        color={theme.colors.text} 
        style={{paddingTop:4}} 
      />
    </TouchableOpacity>
  )
}

export default BellHeaderIcon