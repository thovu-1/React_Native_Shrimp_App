import { StatusBar } from 'expo-status-bar';
import { Button, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { Link, SplashScreen, router, useNavigation} from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import  MyButton  from './components/mybutton';
import 'react-native-gesture-handler';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
const HomePage= () => {
    const [user, setuser] = useState<User | null>(null);
    const navigation = useNavigation();
    useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log('user', user);
        console.log("\n\n\n\n\n\n")
        setuser(user)
        if(user){
          router.replace('/tanks')
        } 
        else {
          router.push('/sign-in')
        }
      });
    }, [])
    
    SplashScreen.preventAutoHideAsync();
    setTimeout(SplashScreen.hideAsync, 2000);
    // const buttonStyles = [styles.myButton, isPressed ? styles.pressedButton: null]
  return (
    <KeyboardAvoidingView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
      <View className="w-full flex justify-center items-center h-full px-4 ">
          <Text className='text-3xl text-white '>Welcome to the Shrimp Tank</Text>
          <MyButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7" textStyles={undefined} isLoading={undefined}          />
        <StatusBar style="light"  backgroundColor='#161630'/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default HomePage;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#161630',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   myButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: 'green',
//   },
//   pressedButton: {
//     backgroundColor: 'darkgreen',
//   },
// });
