import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { text, theme } from '../../constants/theme'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { useState } from 'react'
import ExerciseCard from './ExerciseCard'
import { useStateContext } from '../../context/StateContext'
import { EquipmentType } from '../../types/firestoreTypes'

type Props = { 
  selectedTab: number, 
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>,
}
  
const Exercises = ({selectedTab, setSelectedTab}: Props) => {
  const [selectedItem, setSelectedItem] = useState<EquipmentType | null>(null)
  const {exercises, equipments, language } = useStateContext()

  return (
    <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator={false}
    >
      <View style={{paddingBottom:24}}>
        <View style={{paddingHorizontal:14, paddingTop:6}}>
          <SegmentedControl
            values={['Workouts', 'Exercises']}
            selectedIndex={selectedTab}
            onChange={(event) => setSelectedTab(event.nativeEvent.selectedSegmentIndex) }
            appearance={theme.dark ? 'dark' : 'light'}
          />
        </View>

        <Text style={[styles.text, styles.subtitle]}>{text[language].chooseEquipment}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingTop:8}}
          scrollEventThrottle={100}
        >
            <TouchableOpacity
                onPress={() => setSelectedItem(null) }
              >
                <View 
                  style={{ 
                    backgroundColor: selectedItem===null ? theme.colors.primary : theme.colors.card, 
                    paddingVertical:8,
                    paddingHorizontal:16, 
                    margin:4, 
                    marginLeft: 14,
                    borderRadius: 100,
                    shadowColor: theme.colors.primary,
                    shadowRadius: 7,
                    shadowOpacity: selectedItem===null ? 0.5 : 0,
                    shadowOffset: {width: 0, height: 0}, 
                  }}
                >
                  <Text 
                    style={{
                      fontSize:16,
                      fontWeight: '500',
                      color: selectedItem===null ? theme.colors.onPrimary : theme.colors.text  
                    }} 
                  >
                    All
                  </Text>
                </View>
              </TouchableOpacity>
          { equipments.map((item, index) => {
            const selected = item == selectedItem

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedItem(item) }
              >
                <View 
                  style={{ 
                    backgroundColor: selected ? theme.colors.primary : theme.colors.card, 
                    paddingVertical:8,
                    paddingHorizontal:16, 
                    margin:4, 
                    marginLeft: 4,
                    borderRadius: 100,
                    shadowColor: theme.colors.primary,
                    shadowRadius: 7,
                    shadowOpacity: selected ? 0.5 : 0,
                    shadowOffset: {width: 0, height: 0}, 
                  }}
                >
                  <Text 
                    style={{
                      fontSize:16,
                      fontWeight: '500',
                      color: selected ? theme.colors.onPrimary : theme.colors.text  
                    }} 
                  >
                    {item.language![language].title}
                  </Text>
                </View>
              </TouchableOpacity>
          )})}
        </ScrollView>
      </View>

      { exercises
        .filter((item) => {
          if (selectedItem === null) return true
          else return item.equipments?.includes(selectedItem.id!)
        })
        .map((item, index) => (
        <ExerciseCard data={item} key={index} />
      )) }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    paddingTop:6
  },
  text: {
    color: theme.colors.text,
    fontSize:18
  },
  subtitle: {
    paddingHorizontal:14, 
    paddingTop:24, 
    fontWeight:'600'}
})

export default Exercises