import { Alert, Button, Dimensions, FlatList, Image, KeyboardAvoidingView, LayoutChangeEvent, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyButton from '../components/mybutton'
import FormField from '../components/formfield'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import DropDownPicker from 'react-native-dropdown-picker'
import { router } from 'expo-router'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import Card from '../components/Card'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Tank } from '../interfaces/interfaces'
const MyTanks = () => {

  const headerHeight = Dimensions.get("window").height - Dimensions.get("window").height - 100
  // useStates for creating tanks
  const [isAddingTank, setIsAddingTank] = useState(false)
  const [tankName, setTankName] = useState('');
  const [tankSize, setTankSize] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('G')
  const [measurmentTypes, setMeasurmentTypes] = useState([
    {label: "Liters", value: 'L'},
    {label: "Gallons", value: 'G'},
  ]);
  const [shrimps, setShrimps] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  // useStates for displaying tanks
  const [userTanks, setUserTanks] = useState<Tank[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [currentID, setCurrentID] = useState<string|null>(null)
  const toggleExpanded = (id:any) =>{
    setCurrentID(id);
    setExpanded(!expanded);
  }


  // const renderTank = ({tank}: ListRenderItemInfo<Tank>) => {
  //   return <ListItem item={tank}/>
  // }

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
    return () => subscriber();
  }, [])
  
  async function handlePress(){
    if(tankName === "" || tankSize === "" || shrimps ===""){
      Alert.alert("Error", "Please fill in all fields");
    } else {
      try {
        const doc = await addDoc(collection(FIRESTORE_DB, 'tanks'), {
          name: tankName,
          size: tankSize,
          shrimps: shrimps,
          measurmentType: selected,
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
    setTankSize('');
    setTankName('');
    setShrimps('');
    setIsAddingTank(false)
  }
    
  return (
    <>
    <KeyboardAvoidingView  className="h-full" behavior='height' keyboardVerticalOffset={headerHeight + 50}>


    { 
    //adding tank view here 
    isAddingTank ? (
        <View className="w-full flex justify-center h-full px-4 my-6"  style={{
            minHeight: Dimensions.get("window").height - 100,
          }}>
  
          <FormField 
                title='Tank Name'
                value={tankName}
                placeholder={undefined}
                handleChangeText={(e: string) => setTankName(e)}
                otherStyles='mt-0 ' textStyles='text-black'/>

          <View className='flex-row items-center'>
            <FormField 
                  title='Tank Size'
                  value={tankSize}
                  placeholder={undefined}
                  handleChangeText={(e: string) => setTankSize(e)}
                  otherStyles='mt-7 w-60 pr-5' textStyles='text-black'/>

            <DropDownPicker
              open={open}
              value={selected}
              items={measurmentTypes}
              setOpen={setOpen}
              setValue={setSelected}
              setItems={setMeasurmentTypes}
              style={styles.dropDownStyling}
              containerStyle={{width:'40%',  paddingRight:10}}
            />

          </View>
          <FormField 
              title='How Many Shrimp?'
              value={shrimps}
              placeholder={undefined}
              handleChangeText={(e: string) => setShrimps(e)}
              otherStyles='mt-7 ' textStyles='text-black' keyboardType='numberic'/>

          <View className="mb-8 pb-5 mt-auto">
            <MyButton title="Add Tank" handlePress={handlePress} containerStyles={undefined} textStyles={undefined} isLoading={undefined}/>
            <MyButton title="Cancel" handlePress={clearFields} containerStyles='mt-4' textStyles={undefined} isLoading={undefined}/>
          </View>
        </View>

    ) 
    // normal view here
    : (

        <View className=" w-full flex h-full px-4 "  style={{
          minHeight: Dimensions.get("window").height - 100,
        }}>
          <View className='justify-between items-start flex-row mb-4 '>
            <Text className='text-3xl font-bold text-black mt-10'>Your Tanks</Text>
          </View>
          <View>
            {userTanks.map(tank => (
              
              <View  style={styles.card} key={tank.id}>
                <TouchableOpacity onPress={()=> toggleExpanded(tank.id)}>
                  <View className='flex flex-row justify-between'>
                  <Text className='text-2xl items-center font-semibold text-black pt-4 pb-4 font-psemibold '>{tank.name}</Text>
                  <SimpleLineIcons style={{marginRight:15, verticalAlign:'middle'}}name={expanded && currentID === tank.id ? "arrow-down":"arrow-left"} size={24} color="black" />
                  </View>
                  {expanded && currentID === tank.id ? (
                    <View className='flex flex-col items-start mb-4'>

                      <Text className='break-words'>{tank.name}</Text>
                      <Text>Tank Size: {tank.size}{tank.measurmentUnit}</Text>
                      <Text>Shrimps: {tank.shrimps}</Text>

                    </View>

                ) 
                  : (null)
                  }
                </TouchableOpacity>
              </View>

            ))}
          </View>
          
          <MyButton title="Add Tank" handlePress={()=> setIsAddingTank(true)} containerStyles="mb-12 mt-auto" textStyles={'font-semibold text-lg'} isLoading={undefined}/>


        </View>

     )
  }
      </KeyboardAvoidingView>
  </> 
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
      width: '100%',
      height: 64, // 16 * 4 (px-4) = 64
      borderRadius: 16, // 2 * 8 (rounded-2xl) = 16
      borderWidth: 2,
      borderColor: '#000',
      backgroundColor: '#fff',
      marginTop:65,
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