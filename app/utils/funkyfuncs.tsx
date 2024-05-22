import * as DocumentPicker from 'expo-document-picker';
import { ToastAndroid } from 'react-native';
import { FIREBASE_STOREAGE_BUCKET, FIRESTORE_DB } from '../../FirebaseConfig';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { Tank } from '../interfaces/interfaces';
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
    const photoList = photoResp.items.map((value) => {
      return {name: value.fullPath}
    });
    
    return photoList
}

export const checkIfEquals = (ar1:[], ar2:[]) => {

    if(ar1.length != ar2.length){
      return false;
    }
    for(let i = 0; i < ar1.length; i++){
      if(ar1[i]!= ar2[i]){
        return  false;
      }
    }

    return true
  } 

export const fetchData = async () =>{
    const todoRef = collection(FIRESTORE_DB, 'tanks');
    let tankList:Tank[] = [];
    const subscriber = onSnapshot(todoRef, {    
        next: (snapshot) => {
            console.log("UPDATED");

            const tanks: any = [];
            snapshot.forEach((doc) => {
                tanks.push({...doc.data(), id: doc.id });
            });
            tankList = tanks;
        },
    })

    const imageNames:{name: string}[] = await getImages();
    const images:string[]= [];
    imageNames.forEach((name) =>{
        getDownloadURL(ref(FIREBASE_STOREAGE_BUCKET, name.name)).then((url) => {
            images.push(url);
        });
    });

    let data:{tank: any, uri: string | null}[] = [];
    
    for(let i = 0; i < tankList.length; i++){
        const index = images.indexOf(tankList[i].imageURI)
        if( index > 0){
            
            data.push({tank: tankList[i], uri: images[index]});
        } else {
            data.push({tank: tankList[i], uri: null});
        }
    }
    return {data ,cleanup:() => subscriber()};
}


// const todoRef = collection(FIRESTORE_DB, 'tanks');
// const snapshot = await getDocs(todoRef);
// const tankList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// console.log("TankList");
// console.log(tankList);
// const imageNames = await getImages();
// const imageUrls = await Promise.all(
//   imageNames.map(name => getDownloadURL(ref(FIREBASE_STOREAGE_BUCKET, name.name)))
// );

// const finalData:{tank:Tank, uri:string|null}[] = tankList.map(tank => {
//   const imageUrl = imageUrls.find(url => url === tank.imageURI);
//   return { tank, uri: imageUrl || null };
// });