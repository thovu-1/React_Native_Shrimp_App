import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { RealmProvider } from '@realm/react'

const RootLayout = () => {
  return (
    <RealmProvider>

      <Stack screenOptions={{
        headerStyle:{
          backgroundColor:'#161630'
        },
        headerShown: false,
      }}>
          <Stack.Screen name='index' options={{headerShown:true, headerTitle:""}}/>
          <Stack.Screen name='(tabs)' options={{headerShown:false, headerTitle:"",}}/>
          <Stack.Screen name='(auth)' options={{headerShown:false, headerTitle:"",}}/>
          {/* <Stack.Screen name='HomePage' options={{headerShown:false, headerTitle:"test"}}/> */}
      </Stack>

    </RealmProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})