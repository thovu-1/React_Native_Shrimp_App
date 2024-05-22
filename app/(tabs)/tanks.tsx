import { Alert, Dimensions, Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyButton from '../components/mybutton'
import FormField from '../components/formfield'
import { FIREBASE_STOREAGE_BUCKET, FIRESTORE_DB, uploadImageToFirebase } from '../../FirebaseConfig'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import DropDownPicker from 'react-native-dropdown-picker'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Tank } from '../interfaces/interfaces'
import AddImage from '../components/AddImage'
import { neoBlues, neoColors, neoGreens, neoOranges, neoReds, neoYellows } from '../utils/ShrimpTypes'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import TankUri from '../components/TankUri'

const MyTanks = () => {
  const deviceHeight = Dimensions.get("window").height;
  const deviceWidth = Dimensions.get("window").width;
  const headerHeight = deviceHeight - deviceHeight - 100
  // useStates for creating tanks
  const [isAddingTank, setIsAddingTank] = useState(false)
  const [tankName, setTankName] = useState('');
  const [tankSize, setTankSize] = useState('');
  const [openMeasurment, setOpenMeasurment] = useState(false);
  const [selectedMeasurment, setSelectedMeasurment] = useState('G')
  const [measurmentTypes, setMeasurmentTypes] = useState([
    {label: "Liters", value: 'L'},
    {label: "Gallons", value: 'G'},
  ]);
  const [numOfShrimps, setNumOfShrimps] = useState('');
  const [openShrimpSpecies, setOpenShrimpSpecies] = useState(false);
  const [selectedShrimpSpecies, setSelectedShrimpSpecies] = useState('neo')
  
  const [shrimpSpecies, setShrimpSpecies] = useState([
    {label: 'Neocaridina', value: 'neo'},
    {label: 'Caridina', value: 'car'},
    {label: 'Selawesi', value:'sel'},
  ]);


  const [openShrimpTypes, setOpenShrimpTypes] = useState(false);
  const [selectedShrimpTypes, setSelectedShrimpType] = useState([])

  const [shrimpTypes, setShrimpTypes] = useState<{label: string, value: string}[]>([]);

  const [openShrimpVars, setOpenShrimpVars] = useState(false);
  const [selectedShrimpVars, setSelectedShrimpVars] = useState([]);
  const [shrimpVars, setShrimpVars] = useState<{label: string, value: string}[]>([]);

  const [image, setImage] = useState<string | null>()
  const [additionalInfo, setAdditionalInfo] = useState('');

  // useStates for displaying tanks
  const [userTanks, setUserTanks] = useState<Tank[] >([]);
  const [expanded, setExpanded] = useState(false);
  const [currentID, setCurrentID] = useState<string|null>(null)

  const [imageFileName, setImageFileName] = useState('');


  const toggleExpanded = (id:any) =>{
    setCurrentID(id);
    setExpanded(!expanded);
  }

  async function saveNewTank(){
    if(tankName === "" || tankSize === "" || numOfShrimps ===""){
      Alert.alert("Error", "Please fill in all fields");
    } else {
      try {
        
        const doc = await addDoc(collection(FIRESTORE_DB, 'tanks'), {
          name: tankName,
          size: tankSize,
          numberOfShrimps: numOfShrimps,
          measurmentType: selectedMeasurment,
          species: selectedShrimpSpecies,
          colors: selectedShrimpTypes,
          varients: selectedShrimpVars,
          imageURI:imageFileName,
        });
        
        console.log("DOC");
        console.log(doc);
      }catch(e){
        console.log(e);
      }
      clearFields();
      Alert.alert("Tank added successfully");
      setIsAddingTank(false);
    }
  }
  function clearFields(){
    ToastAndroid.show("Clearing Fields", ToastAndroid.SHORT);
    setTankSize('');
    setTankName('');
    setNumOfShrimps('');
    setIsAddingTank(false)
  }
    
  function closeAllDropDowns(){
    setOpenMeasurment(false);
    setOpenShrimpSpecies(false);
    setOpenShrimpTypes(false);
    setOpenShrimpVars(false);
  }

  async function savePhoto(image:any){
    const {uri} = image.assets[0];
    const fileName = uri.split('/').pop();
    const uploadResp = await uploadImageToFirebase(uri, fileName, (v:any)=> console.log(v));
    console.log("UPLOAD RESP")
    console.log(uploadResp);
    return fileName;
  }


  //Use Effects



  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, 'tanks');

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        console.log("UPDATED");

        const tanks: any = [];
        snapshot.forEach((doc) => {
          tanks.push({...doc.data(), id: doc.id });
        });
        setUserTanks(tanks);
      },
    })
    const test = async () => {
      console.log("HERE");
      console.log(imageFileName)
    }
    test();
   
    return () => subscriber();
  }, [])

  

  useEffect(() => {
    if(image!== null){
      //For uploading to firebase 
      // savePhoto(image.img);
      // setImage({img: null});
      //console.log(image.img);
    }
  }, [image])
  
  useEffect(() => {
    switch(selectedShrimpSpecies){
      case 'neo':
        setShrimpTypes(neoColors);
        break;
      case'car':
        setShrimpTypes([]);
      case'sel':
      setShrimpTypes([]);
        break;
      default:
    }
  }, [selectedShrimpSpecies])

  useEffect(() => {
    //Need to grab everything in 2d array and concat them into 1d array
    let allVars: { label: string; value: string }[][] = [neoReds, neoYellows, neoGreens, neoOranges, neoBlues];
    let retAr: {label: string; value: string }[] = [];
    let temp: { label: string; value: string }[]= selectedShrimpTypes
    temp.forEach(x =>{
     
      for(let i = 0; i < allVars.length; i++){
        if(allVars[i].findIndex(j=> j.value === x)!== -1){

          allVars[i].forEach(v=>{
            retAr.push(v);
          });
        }
      }
      setShrimpVars(retAr);
    })
    
  }, [selectedShrimpTypes])

  //Use Effects for closing dropdowns for better UX
  useEffect(() => {
    if(openMeasurment){
      setOpenShrimpSpecies(false);
      setOpenShrimpTypes(false);
      setOpenShrimpVars(false);
      Keyboard.dismiss();
    } 

  }, [openMeasurment]);
  
  useEffect(() => {
    if(openShrimpSpecies){
      setOpenMeasurment(false);
      setOpenShrimpTypes(false);
      setOpenShrimpVars(false);
      Keyboard.dismiss();
    }
  }, [openShrimpSpecies])

  useEffect(() => {
    if (openShrimpTypes){
      setOpenShrimpVars(false);
      setOpenMeasurment(false);
      setOpenShrimpSpecies(false);
      Keyboard.dismiss();
    }
  }, [openShrimpTypes])

  useEffect(() => {
    if (openShrimpVars){
      setOpenMeasurment(false);
      setOpenShrimpSpecies(false);
      setOpenShrimpTypes(false);
      Keyboard.dismiss();
    }
  }, [openShrimpVars])
  
  
  
  return (
    <TouchableWithoutFeedback onPress={()=> {
      if(isAddingTank){
        closeAllDropDowns();
        Keyboard.dismiss();
      }
      }}>
    <KeyboardAvoidingView  className="h-full" behavior='height' keyboardVerticalOffset={headerHeight + 50}>


      
    { 
    //adding tank view here 
    isAddingTank ? (
        <View className="w-full flex justify-center h-full px-4 my-6"  style={{
            minHeight: deviceHeight - 100,
          }}>

            
          <TouchableOpacity onPress={clearFields} className='absolute right-5 top-0 z-10'>
            <SimpleLineIcons name="close" size={20} color="black" />
          </TouchableOpacity>

            <View className='flex-row  items-center w-full justify-center' >
                <View className='flex-1  w-16 h-full ' >
                  
                  <Text className='text-base text-black font-pmedium text-1xl font-semibold pl-2'>Upload Your Tank</Text>
                  {/* <AddImage image={image} setImage={setImage}/> */}
                  <AddImage image={imageFileName} setImage={setImageFileName}/>
                

                </View>

                  <FormField 
                    title='Tank Name'
                    value={tankName}
                    placeholder={undefined}
                    handleChangeText={(e: string) => setTankName(e)}
                    otherStyles='flex-1  w-full h-full pr-6 pt-7' textStyles='text-black' textContainerStyles={undefined}/>
              
            </View>

          <View className='flex-row justify-between items-center justify-center'>
            <View className='flex-1'>
              <FormField 
                  title='# of Shrimp?'
                  value={numOfShrimps}
                  placeholder={undefined}
                  handleChangeText={(e: string) => setNumOfShrimps(e)}
                  otherStyles='' textStyles='text-black' keyboardType='numberic' textContainerStyles={undefined}/>
            </View>

            <View className='flex-1 '>

              <FormField 
                      title='Tank Size'
                      value={tankSize}
                      placeholder={undefined}
                      handleChangeText={(e: string) => setTankSize(e)}
                      otherStyles=' pr-4 pl-4' textStyles='text-black' textContainerStyles={undefined}/>
            </View>
            
            {/**Picker For Gallons / Liters */}
            <DropDownPicker
                open={openMeasurment}
                value={selectedMeasurment}
                items={measurmentTypes}
                setOpen={setOpenMeasurment}
                setValue={setSelectedMeasurment}
                setItems={setMeasurmentTypes}
                style={styles.dropDownStyling}
                containerStyle={{flex: 1, marginTop:28}}
                labelProps={{numberOfLines: 1}}
                textStyle={{fontSize:18}}
                multipleText=''
                />
          </View>

          <View className='flex-row justify-between items-center justify-center'>

            <View className='flex-1 pr-8'>
              <Text className='text-base text-black font-pmedium text-1xl font-semibold'>Shrimp Species</Text>
              {/**Picker for Species */}
              <DropDownPicker
                    open={openShrimpSpecies}
                    value={selectedShrimpSpecies}
                    items={shrimpSpecies}
                    setOpen={setOpenShrimpSpecies}
                    setValue={setSelectedShrimpSpecies}
                    setItems={setShrimpSpecies} 
                    style={styles.dropDownStyling}
                    containerStyle={{paddingBottom:10}}
                    textStyle={{fontSize:18}}
                    autoScroll={true}
                    />
            </View>
          
            <View className='flex-1 '>
              <Text className='text-base text-black font-pmedium text-1xl font-semibold'>Shrimp Colors</Text>
              {/**Picker for Color */}
              <DropDownPicker
                    open={openShrimpTypes}
                    value={selectedShrimpTypes}
                    items={shrimpTypes}
                    multiple={true}
                    placeholder='Shrimp Colors'
                    setOpen={setOpenShrimpTypes}
                    setValue={setSelectedShrimpType}
                    setItems={setShrimpTypes} 
                    style={styles.dropDownStyling}
                    containerStyle={{paddingBottom:10}}
                    textStyle={{fontSize:18}}
                    autoScroll={true}
                    multipleText={selectedShrimpTypes.length.toString()}
                    />
            </View>

          </View>
          <View className=''>
            <Text className='text-base text-black font-pmedium text-1xl font-semibold'>Shrimp Varients</Text>
            {/**Picker for Varients */}
            <DropDownPicker
                  open={openShrimpVars}
                  value={selectedShrimpVars}
                  items={shrimpVars}
                  multiple={true}
                  placeholder='Optionally select variants'
                  setOpen={setOpenShrimpVars}
                  setValue={setSelectedShrimpVars}
                  setItems={setShrimpVars} 
                  style={styles.dropDownStyling}
                  containerStyle={{paddingBottom:20}}
                  maxHeight={140}
                  textStyle={{fontSize:18}}
                  dropDownDirection='AUTO'
                  autoScroll={true}
                  multipleText={selectedShrimpVars.length.toString()}
                  />
          </View>
          {/* Maybe add images later on. takes up too much space 
          <View className=' pb-1'>
            <AddImage/>
          </View> */}
          <View className='flex flex-wrap border'>
            <View className='flex-row'>
              <View className='flex-1 border-b'>
                <Text>Species: </Text>
              </View>
              <View className='flex-1'>
                <Text className='text-left border-b'>{shrimpSpecies.find(x=>x.value === selectedShrimpSpecies)?.label}</Text>
              </View>
            </View>
            <View className='flex-row border-b'>
              <View className='flex-1'>
                <Text>Colors: </Text>
              </View>
              <View className='flex-1 '>
              {selectedShrimpTypes.map(color => (
                  <View key={color} className='flex-col flex'>
                      <Text className='text-left '>{shrimpTypes.find(x=> x.value === color)?.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className='flex-row '>
              <View className='flex-1'>
                <Text>Varients: </Text>
              </View>
              <View className='flex-1'>
              {selectedShrimpVars.map(vars => (
                  <View key={vars} className='flex-col flex'>
                      <Text className='text-left '>{shrimpVars.find(x=> x.value === vars)?.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
     
          <View className="mb-8 pb-5 mt-auto">
            <MyButton title="Add Tank" handlePress={saveNewTank} containerStyles='mt-4' textStyles={undefined} isLoading={undefined}/>
          </View>
      </View>

    ) 
    ////////////////////////////////////////////////// NORMAL VIEW HERE //////////////////////////////////////////////////
    : (
        <View className=" w-full flex h-full px-4 "  style={{
          minHeight: deviceHeight - 100,
        }}>
          <View className='justify-between flex flex-row mb-2'>
            <View className='flex-1'>
              <Text className='text-3xl font-bold text-black mt-10'>Your Tanks</Text>
            </View>
            <View className='flex-1'>
              <TouchableOpacity className='pl-40 top-10' onPress={()=> setIsAddingTank(true)}>
                <SimpleLineIcons name="plus" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
              <View>
              
                </View>
            {userTanks.map(tank => (
              
              <View  style={styles.card} key={tank.id}>
                <TouchableOpacity onPress={()=> toggleExpanded(tank.id)}>
                  <View className='flex flex-row justify-between'>
                  <Text className='text-2xl items-center font-semibold text-black pt-4 pb-4 font-psemibold '>{tank.name}</Text>
                  <SimpleLineIcons style={{marginRight:15, verticalAlign:'middle'}}name={expanded && currentID === tank.id ? "arrow-down":"arrow-left"} size={24} color="black" />
                  </View>
                  {expanded && currentID === tank.id ? (
                    <View className='flex flex-col items-start mb-4'>
                      <Text>{tank.name}</Text>
                      <Text>Tank Size: {tank.size}{tank.measurmentUnit}</Text>
                      <Text>Shrimps: {tank.numberOfShrimps}</Text>
                      <Text>URI: {tank.imageURI}</Text>
                      {tank.imageURI.length > 0 ? ( <TankUri filename={tank.imageURI}/>): (null)}
                     
                      {/* <Image source={{uri: returnImage(tank.imageURI)}} /> */}
                    </View>
                ) 
                  : (null)
                  }
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

     )
  }
     
      </KeyboardAvoidingView>
  </TouchableWithoutFeedback> 
  )
}

export default MyTanks

// StyleSheet is redundant with NativeWind, however we need to use it for the drop down picker and card for elevation.
const styles = StyleSheet.create({
    main_container:{
      flex:1,
    },
    container:{
      flex:1,
      padding:30
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
    dropDownStyling:{
      minHeight:40, // 16 * 4 (px-4) = 64
      borderRadius: 8, // 2 * 8 (rounded-2xl) = 16
      borderWidth: 1,
      borderColor: '#000',
      backgroundColor: '#fff',
      verticalAlign:'middle',
      zIndex:10

    },
    card: {
      backgroundColor: '#FCFBF4',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8, // For Android shadow
      marginVertical:4,
      paddingLeft: 10,
    },
  })