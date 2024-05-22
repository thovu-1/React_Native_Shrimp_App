import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, Alert, ToastAndroid, Dimensions, ImageProps } from 'react-native'
import React, { useEffect, useState } from 'react'
import FormField from './formfield'
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_STOREAGE_BUCKET, uploadImageToFirebase } from '../../FirebaseConfig';
import { getStorage, ref, listAll } from "firebase/storage";
import { AddImageProps } from '../interfaces/interfaces';


const AddImage = ({image, setImage}) => {
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const [cameraPermissions, requestCameraPermissions] = ImagePicker.useCameraPermissions();
    const [mediaPermissions, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
    const [form, setForm] = useState({
        img: null,
    });

    const takePhoto = async () => {
        const permissions = await ImagePicker.getCameraPermissionsAsync();
        if(permissions.status != 'granted' && permissions.canAskAgain == true){
            Alert.alert('Permission Error', 'You need to grant permission to access the camera', [
                {
                    text: 'Grant Permission',
                    onPress: () => requestCameraPermissions()
                },{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel')
                }
            ])
        }
        try{
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
    
            if(!result.canceled){
                //console.log(result.assets[0].uri);
                //setImage({...image, img: result.assets[0].uri});
                setForm({...form, img: result.assets[0].uri});
                //For uploading to firebase 
                const {uri} = result.assets[0];
                const fileName = uri.split('/').pop();
                const uploadResp = await uploadImageToFirebase(uri, fileName, (v:any)=> console.log(v));
                setImage(fileName);
                
            }
        }catch(e){
            Alert.alert('Error Taking Photo', e.message);
        };
    }

    const pickImage = async () => {
        const permissions = await ImagePicker.getMediaLibraryPermissionsAsync();

        if(permissions.status != 'granted' && permissions.canAskAgain == true){
            Alert.alert('Permission Error', 'You need to grant permission to access the camera', [
                {
                    text: 'Grant Permission',
                    onPress: () => requestMediaPermission()
                },{
                    text: 'Cancel',
                    onPress: () => console.log('Cancel')
                }
            ])
        }
        try{
            
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
    
            if(!result.canceled){
                //setImage({...image, img: result.assets[0].uri});
                setForm({...form, img: result.assets[0].uri});

                const {uri} = result.assets[0];
                const fileName = uri.split('/').pop();
                const uploadResp = await uploadImageToFirebase(uri, fileName, (v:any)=> console.log(v));
                console.log("IMAGE SAVED");
                console.log(uploadResp);
                console.log("SAVING FILE NAME");
                setImage(fileName);
            }

        }catch(e){
            Alert.alert('Error Uploading Image', e.message);
        }
    };
    
  return (
            <View style={{maxHeight:100, maxWidth:100, marginVertical:6}} >
                {/* <TouchableOpacity className='' onPress={() => openPicker('image')}> */}
                <View className='' >
                {form.img ? (
                    <View className=''>
                        <Image style={{width:144, height:96}} resizeMethod='resize' resizeMode='contain' source={{uri: form.img}}/>
                    </View>
                ):(
                    <View  className='w-36 h-24 flex-row rounded-xl border border-black focus:border-secondary bg-white'>
                        <TouchableOpacity className='flex-1 border-r' style={{justifyContent:'center', alignItems:'center'}}
                        onPress={takePhoto}>
                            <AntDesign  style={{verticalAlign:'middle', justifyContent:'center' }} 
                            name="camera" size={24} color="black"  />
                        </TouchableOpacity>
                        <TouchableOpacity className='flex-1 border-l' style={{justifyContent:'center', alignItems:'center'}}
                        onPress={pickImage}>
                            <AntDesign style={{verticalAlign:'middle', justifyContent:'center', }} 
                            name="upload" size={24} color="black"  />
                        </TouchableOpacity>
                            {/* <Text className='text-sm text-black-100 font-pmedium'> Choose an image</Text> */}
                    </View>
                )}
                </View>
            </View>
  )
}

export default AddImage