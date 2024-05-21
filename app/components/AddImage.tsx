import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, Alert, ToastAndroid, Dimensions } from 'react-native'
import React, { useState } from 'react'
import FormField from './formfield'
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase } from '../../FirebaseConfig';
const AddImage = () => {
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const [permission, requestPermission] = ImagePicker.useCameraPermissions();

    if(permission?.status !== ImagePicker.PermissionStatus.GRANTED){
        Alert.alert('Permission Error', 'You need to grant permission to access the camera', [
            {
                text: 'Grant Permission',
                onPress: () => requestPermission()
            },{
                text: 'Cancel',
                onPress: () => console.log('Cancel')
            }
        ])
    }
    const [form, setForm] = useState({
        img: null,
    });

    const takePhoto = async () => {

        try{
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
    
            if(!result.canceled){
                //console.log(result.assets[0].uri);
                const {uri} = result.assets[0];
                const fileName = uri.split('/').pop();
                const uploadResp = await uploadToFirebase(uri, fileName, (v:any)=> console.log(v));
                console.log(uploadResp);
            }
        }catch(e){
            Alert.alert('Error Uploading Image', e.message);
        };
    }
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
                {/* <TouchableOpacity className='' onPress={() => openPicker('image')}> */}
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