import { CourseType, ExerciseType, LessonType, WorkoutType } from "./firestoreTypes";

export type RootStackParamList = {
  Walkthrough: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  TabNavigator: undefined;
  PasswordForgotEmailSend: undefined;
  VerifyEmail: { message: string };
}

export type BottomTabParamList = {
  Workouts: undefined;
  Courses: undefined;
  Profile: undefined;
  Home: undefined;
}

export type HomeStackParamList = {
  Home: undefined;
  Courses: undefined;
  Notifications: undefined;
  Course: { data: CourseType};
  Lesson: { data: LessonType};
  Workouts: undefined;
  Exercise: { data: ExerciseType};
  Workout: { data: WorkoutType};
}

export type CoursesStackParamList = {
  Courses: undefined;
  Course: { data: CourseType};
  Lesson: { data: LessonType};
}

export type ProfileStackParamList = {
  Profile: undefined;
  ChangePassword: undefined;
  Language: undefined;
  PersonalInformations: undefined;
}

export type WorkoutsStackParamList = {
  Workouts: undefined;
  Exercise: { data: ExerciseType};
  Workout: { data: WorkoutType};
}