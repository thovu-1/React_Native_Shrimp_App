import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, Text, View } from 'react-native';
import { Link, router} from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import  MyButton  from './components/mybutton';
import 'react-native-gesture-handler';
const HomePage= () => {
    const [isPressed, setIsPressed] = useState(false);

    // const buttonStyles = [styles.myButton, isPressed ? styles.pressedButton: null]
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
      <View className="w-full flex justify-center items-center h-full px-4 ">
          <Text className='text-3xl text-white '>Welcome to the shrimp shop</Text>
          <MyButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        <StatusBar style="light"  backgroundColor='#161630'/>
        </View>
      </ScrollView>
    </SafeAreaView>
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
