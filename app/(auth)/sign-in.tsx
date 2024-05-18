import { View, Text, ScrollView, StatusBar, Dimensions, Alert, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/formfield'
import MyButton from '../components/mybutton'
import { Link } from 'expo-router'
import axios, { AxiosError } from 'axios'

const SignIn = () => {
    const [form, setForm] = React.useState({
        email:'',
        password:''
    })
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    async function submit () {
      if ( form.email === "" || form.password === "") {
        Alert.alert("Error", "Please fill in all fields");
      }

      try{
        await axios.post("http://localhost:8000/api/login",{
          email: form.email, 
          password: form.password,
          device_name: `${Platform.OS} ${Platform.Version}`
        }, {
          headers: {
            Accept: "application/json",
          },
        })
      } catch (e){
        // Alert.alert("Error", e.response?.data.status);
        console.log(e);
      } 
    }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View  className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}>
            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                Log in to your account
            </Text>

            <FormField 
                  title="Email"
                  value={form.email}
                  handleChangeText={(text: string) => setForm({ ...form, email: text })}
                  otherStyles="mt-7"
                  keyboardType="email-address" placeholder={undefined}                />

            <FormField 
                  title="Password"
                  value={form.password}
                  handleChangeText={(text: string) => setForm({ ...form, password: text })} placeholder={undefined}  otherStyles="mt-7"                />

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
    </SafeAreaView>
  )
}

export default SignIn
