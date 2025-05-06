import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ChatScreen from './Screen/ChatScreen';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <MenuProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ChatScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
