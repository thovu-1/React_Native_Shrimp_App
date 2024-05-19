import { Button, Dimensions, FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MyButton from '../components/mybutton'
import FormField from '../components/formfield'
import { FIRESTORE_DB } from '../../FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

const MyTanks = () => {
  enum MeasurementType {
    Metric = 1,
    Imperial,
  }
  const [isAddingTank, setIsAddingTank] = useState(false)
  const [tankName, setTankName] = useState('');
  const [tankType, setTankType] = useState('');
  const [tankSize, setTankSize] = useState('');
  const [measurmentType, setMeasurmentType] = useState('');
    async function handlePress(){
      // const doc = await addDoc(collection(FIRESTORE_DB, 'tanks'), {
      //   name: "Tank 1",
      //   type: "",
      //   size: "100",
      // });
    }
    function clearFields(){
      setTankType('');
      setTankSize('');
      setTankName('');
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
          handleChangeText={(e:string)=> setTankName(e)}  
          otherStyles='mt-7 text-black'/>

          <View className="mb-8 mt-auto">
            <MyButton title="Add Tank" handlePress={clearFields} containerStyles={undefined} textStyles={undefined} isLoading={undefined}/>
            <MyButton title="Cancel" handlePress={() => setIsAddingTank(false)} containerStyles='mt-4' textStyles={undefined} isLoading={undefined}/>
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
  })