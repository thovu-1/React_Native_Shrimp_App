import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyButton from '../components/mybutton'
const MyTanks = () => {
    function handlePress(){
    }
  return (
    <View style={styles.main_container}>
        <View style={styles.container}>
            <Text>MyTanks</Text>

        </View>

        <View style={[styles.button, {bottom:50}] }>
            <MyButton title="Add Tank" onPress={handlePress} isPressed={false}/>
        </View>
    </View>
  )
}

export default MyTanks

const styles = StyleSheet.create({
    main_container:{
      flex:1,
    },
    container:{
      flex:1,
      padding:30
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
  })