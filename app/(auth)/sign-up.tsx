import { Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../components/formfield'

import { Link, router } from 'expo-router';
import MyButton from '../components/mybutton';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import HomePageImage from '../components/HomePageImage';

const SignUp = () => {
  // const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const auth = FIREBASE_AUTH;
  
  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, form.email, form.password);
      console.log(response);
      ToastAndroid.show("User created successfully", ToastAndroid.SHORT);
    } catch (error) {
      Alert.alert("Sign in failed!", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <KeyboardAvoidingView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
           <HomePageImage/>

          <Text className="text-2xl font-semibold text-white mt-2 font-psemibold">
            Sign Up 
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-2" placeholder={'Enter a username'} textStyles={undefined} textContainerStyles={'h-16'}          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email-address" placeholder={'Enter your email'} textStyles={undefined} textContainerStyles={'h-16'}          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4" placeholder={undefined} textStyles={undefined} textContainerStyles={'h-16'}         />

          <MyButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting} textStyles={undefined}          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161630',
        alignItems: 'center',
        justifyContent: 'center',
      },
})