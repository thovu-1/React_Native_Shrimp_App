import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import FormField from './formfield'
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
const AddImage = () => {
    const [form, setForm] = useState({
        img: null,
    });

    const openPicker = async (selectType: string) =>{

        if(selectType === 'image'){
            
            const result = await DocumentPicker.getDocumentAsync({
                type: ['image/png', 'image/jpg']
            })
            
            if(!result.canceled){
                setForm({...form, img: result.assets[0]});
            } else {
                setTimeout(()=>{
                    Alert.alert('Document picked', JSON.stringify(result, null, 2))
                }, 100)
            }
        }
    }

  return (
    <KeyboardAvoidingView className="h-full" behavior='height' keyboardVerticalOffset={50}>
        <ScrollView className='px-4 my-6'>
            <Text className="text-2xl text-black font-semibold">
            Upload an image 
            </Text>
            <TouchableOpacity onPress={() => openPicker('image')}>
            {form.img ? (
                <Image className='w-full h-64 rounded-2xl' resizeMode='cover' source={{uri: form.img.uri}}/>
            ):(
                <View className='w-full h-40 px-4 rounded-2xl border-2 border-black-200 focus:border-secondary items-center bg-white'>
                    <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                        <AntDesign name="upload" size={24} color="black" />
                        <Text className='text-sm text-gray-100 font-pmedium'> Choose a file</Text>
                    </View>
                </View>
            )}
            </TouchableOpacity>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddImage