import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native'
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
            
            const result = await DocumentPicker.getDocumentAsync();
            
            if(!result.canceled){
                setForm({...form, img: result.assets[0]});
            } else {
                setTimeout(()=>{
                    ToastAndroid.show("Document picked: " + JSON.stringify(result, null, 2), ToastAndroid.SHORT);
                    // Alert.alert('Document picked', JSON.stringify(result, null, 2))
                }, 100)
            }
        }
    }

  return (
    <KeyboardAvoidingView  className={form.img ? "h-full" : "h-30"} behavior='height' keyboardVerticalOffset={50}>
        <ScrollView>
            <Text className="text-base font-pmedium text-1xl font-semibold">
            Upload an image 
            </Text>
            <TouchableOpacity onPress={() => openPicker('image')}>
            {form.img ? (
                <Image className='h-64' resizeMode='contain' source={{uri: form.img.uri}}/>
            ):(
                <View className='w-full h-16 px-4 rounded-2xl border-2 border-black focus:border-secondary items-center bg-white'>
                        <AntDesign name="upload" size={24} color="black" className='w-1/2 h-1/2' />
                        <Text className='text-sm text-black-100 font-pmedium'> Choose an image</Text>
                </View>
            )}
            </TouchableOpacity>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddImage