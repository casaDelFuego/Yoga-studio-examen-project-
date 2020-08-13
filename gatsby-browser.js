
import React from 'react'
import Firebase from './src/services/firebase'
import FirebaseContext from './src/services/context'
//import app from 'firebase'

// to make the app lighter we should import parts of firebase manually, cuz it grew too big! 
import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


export const wrapRootElement = ({ element }) => (
    <FirebaseContext.Provider value={new Firebase(app)}>{element}</FirebaseContext.Provider>
)


