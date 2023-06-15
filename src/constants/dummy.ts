import { Image } from "react-native"

import image1 from '../../assets/temporally/shutterstock_1859652601-2048x1365.png'
import image2 from '../../assets/temporally/shutterstock_1064879663-scaled.png'
import image3 from '../../assets/temporally/shutterstock_1743947300-2048x1366.png'
import image4 from '../../assets/temporally/shutterstock_1993636730-2048x1365.png'

export const blogData = [
  {
    title:'First Things to Teach Your Puppy',
    image: Image.resolveAssetSource(image1).uri
  },
  {
    title: 'How to Teach Your Dog to Drop Items',
    image: Image.resolveAssetSource(image2).uri
  },
  {
    title: 'Using Treats for Dog Training',
    image: Image.resolveAssetSource(image3).uri
  },
  {
    title: 'How to Stop Your Dog From Jumping',
    image: Image.resolveAssetSource(image4).uri
  }
]

export const trainingsData = [
  {
    title:'Puppy Training',
    image: Image.resolveAssetSource(image1).uri,
    dificulty: 1,
    duration: 30
  },
  {
    title: 'SmartX50',
    image: Image.resolveAssetSource(image2).uri,
    dificulty: 3,
    duration: 90
  },
  {
    title: 'Red Light Green Light',
    image: Image.resolveAssetSource(image3).uri,
    dificulty: 2,
    duration: 45
  },
  {
    title: 'One-Two-Three Walking',
    image: Image.resolveAssetSource(image4).uri,
    dificulty: 1,
    duration: 15
  }
]

export const exercisesData = [
  {
    id: 0,
    title: 'Turn Cicles Right and Left',
    dificulty: 3,
    duration: 5,
    equipment: 'Hurdle Set, Agility Kit'
  },
  {
    id: 1,
    title: 'Cavaletti Jumps',
    dificulty: 1,
    duration: 5,
    equipment: 'Hurdle Set'
  },
  {
    id: 2,
    title: 'Sit to Kickback Stand',
    dificulty: 1,
    duration: 10,
    equipment: 'Hurdle Set, Balance Discs'
  },
  {
    id: 3,
    title: 'Catch the Ball',
    dificulty: 2,
    duration: 5,
    equipment: 'Agility kit'
  }
]

// lesson 1= IOAoROfGDWkphpHpOy8c
// lessson 2= 4VNHLmL8fwny5naIMK0A

export const workoutsData = [
  {
    id: 0,
    title: 'Workout Hard',
    dificulty: 3,
    duration: 20,
    exerciseIds: [1,2,3]
  },
  {
    id: 1,
    title: 'Workout Essential',
    dificulty: 1,
    duration: 15,
    exerciseIds: [0,1,3]
  },
  {
    id: 2,
    title: 'Workout Easy',
    dificulty: 1,
    duration: 10,
    exerciseIds: [0,1,2]
  },
  {
    id: 3,
    title: 'Workout Medium',
    dificulty: 2,
    duration: 20,
    exerciseIds: [0,2,3]
  }
]

//7MGkZnlnoIoJVzx6ZIBH

