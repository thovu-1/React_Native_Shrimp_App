import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const FormField = ({title, value, placeholder, handleChangeText,textStyles, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className={`text-base text-gray-100 font-pmedium text-1xl font-semibold ${textStyles}`}>{title}</Text>

      <View className="w-full h-16 px-4 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center bg-white">
        <TextInput
          className={`flex-1 text-black  font-psemibold text-base ${textStyles}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons name={showPassword? 'eye-off' : 'eye'} size={24} color='grey'/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: '#161630',
//         justifyContent: 'flex-start',
//     },
//     text:{
//         color: 'white',
//         fontSize: 20,
//         fontWeight:'300',
//         textAlign: 'left',
//     },
//     inputBox:{
//         height:50,
//         borderWidth:2,
//         width:'100%',
//         borderColor:'lightgray',
//         backgroundColor: 'white',
//         borderRadius: 10,
//         fontSize: 20,
//         fontWeight:'100',
//         paddingLeft:5,
//         flexDirection:'row',
//     },
//     inputText:{
//         flex:1,
//         width:'100%',
//         height:'100%',
//         color:'#161630',
//         fontWeight:'200',
//         fontSize: 20,
//         textAlignVertical:'center',


//     },
//     eyeCon: {
//         resizeMode:'contain',
//         paddingTop:10,
//     }
// })