import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCbfGIJ8HmeMDyMzrbPQjRtA-9mwAAiyI4",
  authDomain: "random-name-18887.firebaseapp.com",
  projectId: "random-name-18887",
  storageBucket: "random-name-18887.appspot.com",
  messagingSenderId: "21244163126",
  appId: "1:21244163126:web:2406e6162da1c744e01497",
  measurementId: "G-9WRCNNMM4Y"
}

let myApp = initializeApp(firebaseConfig)

export const db = getFirestore(myApp)
