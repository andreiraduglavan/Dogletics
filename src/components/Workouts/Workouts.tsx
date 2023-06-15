import { StyleSheet, FlatList } from 'react-native'
import { theme } from '../../constants/theme'
import { workoutsData } from '../../constants/dummy'
import WorkoutCard from '../../components/Workouts/WorkoutCard'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useStateContext } from '../../context/StateContext'

type Props = { selectedTab: number, setSelectedTab: React.Dispatch<React.SetStateAction<number>> }

const Header = ({selectedTab, setSelectedTab}: Props) => (
  <SegmentedControl
    values={['Workouts', 'Exercises']}
    selectedIndex={selectedTab}
    onChange={(event) => setSelectedTab(event.nativeEvent.selectedSegmentIndex) }
    style={{marginBottom:24}}
    appearance={theme.dark ? 'dark' : 'light'}
  />
)

const Workouts = ({selectedTab, setSelectedTab}: Props) => {  
  const { workouts } = useStateContext()

  return (
    <FlatList
      data={workouts}
      renderItem={({item}) => <WorkoutCard data={item} /> }
      keyExtractor={item => item.id! }
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => ( <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> )}
      contentContainerStyle={styles.container}
    /> 
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

export default Workouts