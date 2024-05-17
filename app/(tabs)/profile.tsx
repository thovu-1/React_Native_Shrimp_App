import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const profile = () => {
  return (
    <View style={styles.main_container}>
      <View style={styles.container}>
        <Text>My Profile</Text>
        <Text>Username</Text>
      </View>
      <View style={styles.container}>
        
      </View>
    </View>
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