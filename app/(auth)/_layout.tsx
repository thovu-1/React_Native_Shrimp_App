import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { RealmProvider } from '@realm/react'

const AuthLayout = () => {
  return (
    <RealmProvider>
        <Stack>
            <Stack.Screen name='sign-in' options={{headerShown:false}}/>
            <Stack.Screen name='sign-up' options={{headerShown:false}}/>
        </Stack> 
        <StatusBar style="light"  backgroundColor='#161630'/>
    </RealmProvider>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})