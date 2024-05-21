import { View, Text, Image } from 'react-native'
import React from 'react'

const HomePageImage = () => {
  return (
    <View style={{justifyContent:'center', alignItems:'center', maxHeight:200}} className='w-full h-full flex-row flex-1 pb-7'>
              <Image 
              style={{width:200, height:200,
              }}
              resizeMode='contain' 
              source={require('../../assets/otherpics/AppIcon4.png')}/>
            </View>
  )
}

export default HomePageImage