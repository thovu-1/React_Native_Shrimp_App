import { View, Text, ScrollView, StatusBar, Dimensions, Alert, Platform, KeyboardAvoidingView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/formfield'
import MyButton from '../components/mybutton'
import { Link, useNavigation } from 'expo-router'

import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import HomePageImage from '../components/HomePageImage'

const SignIn = () => {
  // const { setUser, setIsLogged } = useGlobalContext();
    const [form, setForm] = React.useState({
        email:'',
        password:''
    })
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH;
    const width = Dimensions.get("window").width;
    const height= Dimensions.get("window").height;
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    async function submit () {
      if ( form.email === "" || form.password === "") {
        Alert.alert("Error", "Please fill in all fields");
      }

      setIsSubmitting(true);
      try{
        const response = await signInWithEmailAndPassword(auth, form.email, form.password);
        console.log(response);
      } catch (e){
        console.log(e);
        Alert.alert("Sign in failed ", e.message);
      } finally {
        setIsSubmitting(false);
      }
    }

  return (
    <KeyboardAvoidingView className="bg-primary h-full" behavior='padding'>
      <ScrollView>
        <View  className="w-full flex justify-center h-full px-4"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}>
            {/* <View style={{justifyContent:'center', alignItems:'center', maxHeight:200}} className='w-full h-full flex-row flex-1 pb-7'>
              <Image 
              style={{width:200, height:200,
              }}
              resizeMode='contain' 
              source={require('../../assets/otherpics/AppIcon4.png')}/>
            </View> */}
            <HomePageImage/>
            <Text className="text-2xl font-semibold text-white mt-2 font-psemibold">
                Log in to your account
            </Text>

            <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(text: string) => setForm({ ...form, email: text })}
            otherStyles="mt-7"
            keyboardType="email-address" placeholder={undefined} textStyles={undefined} textContainerStyles={'h-16'}/>

            <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(text: string) => setForm({ ...form, password: text })} placeholder={undefined} otherStyles="mt-7" textStyles={undefined} textContainerStyles={'h-16'}/>

            <MyButton 
                  title="Sign In"
                  handlePress={submit}
                  isLoading={isSubmitting} 
                  containerStyles="mt-10"
                  textStyles={undefined}                />

            <View className="flex justify-center pt-5 flex-row gap-2">
                <Text style={{fontSize:18, color:'lightgrey'}}>Don't have an account?</Text>
                <Link href='sign-up' style={{fontSize:18, color:'orange', paddingLeft:5, fontWeight:'semibold'}}>Sign Up</Link>
            </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignIn
