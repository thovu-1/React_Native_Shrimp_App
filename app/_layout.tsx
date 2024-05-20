import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from './components/header'

const RootLayout = () => {
  return (
    <>

      <Stack screenOptions={{
        headerStyle:{
          backgroundColor:'#161630'
        },
        statusBarColor:'#161630',
        statusBarStyle:'light',
        headerShown: false,
      }}>
          <Stack.Screen name='index' options={{headerShown:true, headerTitle:() => <Header/>}}/>
          <Stack.Screen name='(tabs)' options={{headerShown:true, headerTitle:() => <Header/>,}}/>
          <Stack.Screen name='(auth)' options={{headerShown:true, headerTitle:() => <Header/>,}}/>
          {/* <Stack.Screen name='HomePage' options={{headerShown:false, headerTitle:"test"}}/> */}
      </Stack>

    </>
  )
}

export default RootLayout

const styles = StyleSheet.create({})