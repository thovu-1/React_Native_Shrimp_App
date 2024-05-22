import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { FIREBASE_STOREAGE_BUCKET } from '../../FirebaseConfig';


const TankUri = ({filename}) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if(filename.length > 0){
            returnImage(filename);
        }
    }, [])
    
    const returnImage = async (fileName:string) => {
    
        await getDownloadURL(ref(FIREBASE_STOREAGE_BUCKET, 'images/'+fileName)).then((x) => {
            console.log("X gonna give it to you")
            console.log(x)
            setName(x);
        }).catch((e) => {
          Alert.alert("Error in returnImage", e.message);
        })
      }

  return (
    <View>
      {name.length > 0 ?  (<Image source={{uri: name}} style={{height:25, width:25}}/>):(<Text>No Image</Text>)  }
      
    </View>
  )
}

export default TankUri