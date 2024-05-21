import { View, Text, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View className="bg-primary w-full h-full flex  justify-center">
       
        <View className="items-center mr-8">
            <Text className='font-bold text-3xl text-secondary tracking-wide'>Shrimp Tank</Text>
        </View>
        {/* <Image source={require('../../assets/otherpics/AppIcon3.png')} 
        style={{height:50, width:50, resizeMode:'contain', position:'absolute', right:40, top:-12}}/> */}
    </View>
  )
}

export default Header