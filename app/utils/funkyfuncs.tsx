import * as DocumentPicker from 'expo-document-picker';
import { ToastAndroid } from 'react-native';
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