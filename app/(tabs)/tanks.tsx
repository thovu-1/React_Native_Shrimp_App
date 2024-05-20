import { Alert, Button, Dimensions, FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyButton from '../components/mybutton'
import FormField from '../components/formfield'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import DropDownPicker from 'react-native-dropdown-picker'
import { router } from 'expo-router'

const MyTanks = () => {
  enum MeasurementType {
    Metric = 1,
    Imperial,
  }
  const [isAddingTank, setIsAddingTank] = useState(false)
  const [tankName, setTankName] = useState('');
  const [tankSize, setTankSize] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('L')
  const [measurmentTypes, setMeasurmentTypes] = useState([
    {label: "Liters", value: 'L'},
    {label: "Gallons", value: 'G'},
  ]);

  
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
      <KeyboardAvoidingView className="bg-pastelblue h-full" behavior='padding' >
        
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
      <KeyboardAvoidingView className="bg-pastelblue h-full" behavior='padding' >
        <View className=" w-full flex justify-center h-full px-4 my-6"  style={{
          minHeight: Dimensions.get("window").height - 100,
        }}>
          <View>
              <FlatList
                data={[{id:1}, {id:2}, {id:3}]}
                keyExtractor={(item) => item.$id}
                renderItem={({item}) =>(
                  <Text className="text-3xl" key={item.id}>{item.id}</Text>
                )}
                ListHeaderComponent={()=>(
                  <View className='my-1 px-4 space-y-6'>
                    <View className="justify-between items-start flex-row mb-6">
                        <Text className="text-2xl font-semibold text-black mt-10 font-psemibold">
                          Your Tanks
                        </Text>
                        <Image source={require('../../assets/otherpics/AppIcon4.png')} className="w-9 h-10 mt-8" resizeMode='contain'/>
                    </View>
                  </View>
                )}
              />
          </View>
          
          <MyButton title="Add Tank" handlePress={()=> setIsAddingTank(true)} containerStyles="mt-7 mb-8 mt-auto" textStyles={undefined} isLoading={undefined}/>


        </View>
      </KeyboardAvoidingView>
     )
  }
  </> 
  )
}

export default MyTanks

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