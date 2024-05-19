import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MyButton from '../components/mybutton'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig'
import { addDoc } from 'firebase/firestore'

const profile = () => {

  useEffect(() => {
    // addDoc(collection(FIRESTORE_DB, ''))
  
   
  }, [])
  

  return (
    <ScrollView>
      <View style={styles.main_container}>
        <View style={styles.container}>
          <Text>My Profile</Text>
          <Text>Username</Text>
        </View>
        <View style={styles.container}>
          <MyButton title="Sign Out" handlePress={() => FIREBASE_AUTH.signOut()}  containerStyles="mt-7"
            />
        </View>
      </View>
    </ScrollView>
  )
}

export default profile

const styles = StyleSheet.create({
  main_container:{
    flex:1,
  },
  container:{
    flex:1,
    padding:30
  }
})