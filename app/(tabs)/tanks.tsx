import { Alert, Button, Dimensions, FlatList, Image, KeyboardAvoidingView, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyButton from '../components/mybutton'
import FormField from '../components/formfield'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import DropDownPicker from 'react-native-dropdown-picker'
import { router } from 'expo-router'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Tank } from '../getData'
import { ListItem } from '../components/ListItem'

const MyTanks = () => {
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

  // useStates for displaying tanks
  const [userTanks, setUserTanks] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  const onTankPressed = () => {
    setExpanded(!expanded);
  }

  const animatedStyle = useAnimatedStyle(()=>{
    const animatedHeight = expanded ? withTiming(200) : withTiming(0)
    return {
      height: animatedHeight
    }
  });

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
    if(tankName === "" || tankSize === ""){
      Alert.alert("Error", "Please fill in all fields");
    } else {
      try {
        const doc = await addDoc(collection(FIRESTORE_DB, 'tanks'), {
          name: tankName,
          size: tankSize,
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
    setIsAddingTank(false)
  }
    
  return (
    <>
    { 
    //adding tank view here 
    isAddingTank ? (
      <KeyboardAvoidingView className="bg-offwhite h-full" behavior='padding' >
        
        <View className="w-full flex justify-center h-full px-4 my-6"  style={{
            minHeight: Dimensions.get("window").height - 100,
          }}>
  
          <FormField 
                title='Tank Name'
                value={tankName}
                placeholder={undefined}
                handleChangeText={(e: string) => setTankName(e)}
                otherStyles='mt-20 ' textStyles='text-black'/>

          <View className='flex flex-row items-center'>
            <FormField 
                  title='Tank Size'
                  value={tankSize}
                  placeholder={undefined}
                  handleChangeText={(e: string) => setTankSize(e)}
                  otherStyles='mt-7 w-60 pr-10 ' textStyles='text-black'/>

            <DropDownPicker
              open={open}
              value={selected}
              items={measurmentTypes}
              setOpen={setOpen}
              setValue={setSelected}
              setItems={setMeasurmentTypes}
              style={styles.dropDownStyling}
              containerStyle={{width:'40%', paddingRight:40}}
            />
            
          </View>

          <View className="mb-8 mt-auto">
            <MyButton title="Add Tank" handlePress={handlePress} containerStyles={undefined} textStyles={undefined} isLoading={undefined}/>
            <MyButton title="Cancel" handlePress={clearFields} containerStyles='mt-4' textStyles={undefined} isLoading={undefined}/>
          </View>
        </View>
      </KeyboardAvoidingView>
    ) 
    // normal view here
    : (
      <KeyboardAvoidingView className="bg-offwhite h-full" behavior='padding' >
        <View className=" w-full flex justify-center h-full px-4 "  style={{
          minHeight: Dimensions.get("window").height - 100,
        }}>
          <View className='justify-between items-start flex-row mb-4 '>
            <Text className='text-3xl font-bold text-black mt-10'>Your Tanks</Text>
          </View>
          <View>
            {userTanks.map(tank => (
              
              <View>
                <TouchableOpacity onPress={onTankPressed}>
                  <Text key={tank.id} className='text-2xl font-semibold text-black mt-10 font-psemibold'>{tank.name}</Text>
                </TouchableOpacity>
                {/* <Animated.View style={animatedStyle}>
                    <Text>test</Text>
                  </Animated.View>    */}
              </View>

            ))}
          </View>
          
          <MyButton title="Add Tank" handlePress={()=> setIsAddingTank(true)} containerStyles="mb-12 mt-auto" textStyles={'font-semibold text-lg'} isLoading={undefined}/>


        </View>
      </KeyboardAvoidingView>
     )
  }
  </> 
  )
}

export default MyTanks

// StyleSheet is redundant with NativeWind, however we need to use it for the drop down picker.
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
    }
  })