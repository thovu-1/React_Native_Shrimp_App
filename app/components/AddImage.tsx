import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, Alert, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import FormField from './formfield'
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
const AddImage = () => {
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
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

            <View style={{maxHeight:100, maxWidth:100, marginVertical:6}} >

                <TouchableOpacity className='' onPress={() => openPicker('image')}>
                {form.img ? (
                    <View className=''>
                        <Image style={{width:128, height:96}} resizeMethod='resize' resizeMode='contain' source={{uri: form.img.uri}}/>
                    </View>
                ):(
                    <View className='w-32 h-24 rounded-xl border border-black focus:border-secondary items-center bg-white'>
                            <AntDesign style={{top:'35%' , verticalAlign:'middle'}} name="upload" size={24} color="black"  />
                            {/* <Text className='text-sm text-black-100 font-pmedium'> Choose an image</Text> */}
                    </View>
                )}
                </TouchableOpacity>
            </View>

  )
}

export default AddImage