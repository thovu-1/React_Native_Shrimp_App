import { View, Text, Image } from 'react-native'
import React from 'react'

const Card = (title: any, img:string, detail:any) => {
    const path = require('../../assets/otherpics/blue_dream.png')
  return (
    <>
    <View className="w-full h-full flex">
    
        <View className="flex-row">
        <Image src={path}/>

        <Text>{title}</Text>
        <Text>{detail}</Text>
        </View>

    </View>
    </>
  )
}

export default Card