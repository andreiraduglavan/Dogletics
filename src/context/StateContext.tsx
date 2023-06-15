import { collection, onSnapshot, query } from "firebase/firestore"
import { useContext, useState, createContext, useEffect, useCallback } from "react"
import { db } from "../firebase/clientApp"
import { BlogpostType, CourseType, EquipmentType, ExerciseType, LessonType, SalesBannerType, WorkoutType } from "../types/firestoreTypes"
import * as SplashScreen from 'expo-splash-screen';
import { getLocales } from 'expo-localization';
import { View } from "react-native";

SplashScreen.preventAutoHideAsync()

type StateContextType = {
  blogposts: BlogpostType[];
  courses: CourseType[];
  equipments: EquipmentType[];
  exercises: ExerciseType[];
  lessons: LessonType[];
  salesBanners: SalesBannerType[];
  workouts: WorkoutType[];
  language: 'en' | 'de';
  setCourses: React.Dispatch<React.SetStateAction<CourseType[]>>;
  setLanguage: React.Dispatch<React.SetStateAction<"en" | "de">>
}

const Context = createContext<StateContextType | null>(null)

type Props = { children: React.ReactNode } 

export const StateContext = ({children}: Props) => { 
  const [fetchIsDone, setFetchIsDone] = useState(false)
  const [language, setLanguage] = useState<'en' | 'de'>('en')

  useEffect(() => {
    const languages = getLocales().map((item) => item.languageCode)
    for (let i = 0; i < languages.length; i++) {
      languages[i] == 'en' && setLanguage('en')
      languages[i] == 'de' && setLanguage('de')
      break   
    }
  
  }, [])

  const [blogposts, setBlogposts] = useState<BlogpostType[]>([])
  const [courses, setCourses] = useState<CourseType[]>([])
  const [equipments, setEquipments] = useState<EquipmentType[]>([])
  const [exercises, setExercises] = useState<ExerciseType[]>([])
  const [lessons, setLessons] = useState<LessonType[]>([])
  const [salesBanners, setSalesBanners] = useState<SalesBannerType[]>([])
  const [workouts, setWorkouts] = useState<WorkoutType[]>([])

  
  useEffect(() => {
    const queryBlogposts = query(collection(db, "blogposts"))
    onSnapshot(queryBlogposts, (querySnapshot) => {
      const blogposts: BlogpostType[] = []
      querySnapshot.forEach((doc) => {
          blogposts.push({id: doc.id, ...doc.data() } as BlogpostType)
      })
      setBlogposts(blogposts)
    })

    const queryCourses = query(collection(db, "courses"))
    onSnapshot(queryCourses, (querySnapshot) => {
      const courses: CourseType[] = []
      querySnapshot.forEach((doc) => {
        courses.push({id: doc.id, userAllowed: false, ...doc.data() } as CourseType)
      })
      setCourses(courses)
    })

    const queryEquipments = query(collection(db, "equipments"))
    onSnapshot(queryEquipments, (querySnapshot) => {
      const equipments: EquipmentType[] = []
      querySnapshot.forEach((doc) => {
          equipments.push({id: doc.id, ...doc.data() } as EquipmentType)
      })
      setEquipments(equipments)
    })

    const queryExercises = query(collection(db, "exercises"))
    onSnapshot(queryExercises, (querySnapshot) => {
      const exercies: ExerciseType[] = []
      querySnapshot.forEach((doc) => {
          exercies.push({id: doc.id, ...doc.data() } as ExerciseType)
      })
      setExercises(exercies)
    })

    const queryLessons = query(collection(db, "lessons"))
    onSnapshot(queryLessons, (querySnapshot) => {
      const lessons: LessonType[] = []
      querySnapshot.forEach((doc) => {
          lessons.push({id: doc.id, ...doc.data() } as LessonType)
      })
      setLessons(lessons)
    })

    const querySalesBanners = query(collection(db, "salesBanners"))
    onSnapshot(querySalesBanners, (querySnapshot) => {
      const salesBanners: SalesBannerType[] = []
      querySnapshot.forEach((doc) => {
          salesBanners.push({id: doc.id, ...doc.data() } as SalesBannerType)
      })
      setSalesBanners(salesBanners)
    })

    const queryWorkouts = query(collection(db, "workouts"))
    onSnapshot(queryWorkouts, (querySnapshot) => {
      const workouts: WorkoutType[] = []
      querySnapshot.forEach((doc) => {
          workouts.push({id: doc.id, ...doc.data() } as WorkoutType)
      })
      setWorkouts(workouts)
      setFetchIsDone(true)
    })


  },[])

  const onLayoutRootView = useCallback(async () => {
    if (fetchIsDone) {
      await SplashScreen.hideAsync();
    }
  }, [fetchIsDone]);

  if (!fetchIsDone) {
    return null;
  }

  return(
    <Context.Provider 
      value={{
        blogposts,
        courses,
        equipments, 
        exercises,
        lessons,
        salesBanners,
        workouts, 
        language,
        setCourses,
        setLanguage
      }}>
      <View
        style={{flex:1}}
        onLayout={onLayoutRootView}
      >
        {children}
      </View>
    </Context.Provider>
  )
}

export const useStateContext = () => {
  const stateContext = useContext(Context)

  if (!stateContext) throw new Error('You need to use this hook inside a context provider');

  return stateContext;
}