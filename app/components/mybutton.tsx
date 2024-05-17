import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useState } from 'react'


const MyButton = ({title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {

  return (

    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-secondary rounded-xl min-h-[62px] width-full justify-center items-center ${containerStyles} ${
      isLoading ? "opacity-50" : ""
    }`}
    disabled={isLoading}
  >
    <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
      {title}
    </Text>

    {isLoading && (
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size="small"
        className="ml-2"
      />
    )}
  </TouchableOpacity>

  )
}


export default MyButton
const styles = StyleSheet.create({
    appButtonContainer: {
      backgroundColor: "green",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    appButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
    },
    myButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: 'orange',
    },
  });