import * as DocumentPicker from 'expo-document-picker';
import { ToastAndroid } from 'react-native';
import { FIREBASE_STOREAGE_BUCKET } from '../../FirebaseConfig';
import { listAll, ref } from 'firebase/storage';
 type docPicker = {
    setForm: (form: any) => void;
    form: any;
    selectType: string;
}
export const openPicker = async (props: docPicker) =>{

    if(props.selectType === 'image'){
        
        const result = await DocumentPicker.getDocumentAsync();
        
        if(!result.canceled){
            props.setForm({...props.form, img: result.assets[0]});
        } else {
            setTimeout(()=>{
                ToastAndroid.show("Document picked: " + JSON.stringify(result, null, 2), ToastAndroid.SHORT);
                // Alert.alert('Document picked', JSON.stringify(result, null, 2))
            }, 100)
        }
    }
}

export const getImages = async () => {
    // Create a reference under which you want to list
    const photoRef = ref(FIREBASE_STOREAGE_BUCKET, 'images');
    
    // Find all the prefixes and items.
    const photoResp  = await listAll(photoRef)
    const photos = photoResp.items.map((value) => {
      return {name: value.fullPath}
    });
    
    return photos
}