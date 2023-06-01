import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="bg-zinc-900 flex-1 items-center justify-center">
      <Text className='text-zinc-50 font-bold text-5xl'>Hello world</Text>
      <StatusBar style="light" />
    </View>
  );
}
 
