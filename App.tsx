/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, FlatList } from 'react-native';
import Greeting from './components/Greeting';
import Header from './components/Header';
import { Provider as PaperProvider } from 'react-native-paper';
import InputField from './components/InputField'
import MessageBubble from './components/MessageBubble'
import Message from './types/message';

function App() {

  const isDarkMode = useColorScheme() === 'dark';
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type: 'text',
      sender: 'me',
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.content}>
          {showGreeting ? <Greeting /> : <Header />}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            inverted
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.listContent}
            style={styles.list}
          />
        </View>
        <InputField onSend={handleSendMessage} />
    </View>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    paddingBottom:10,
  },
  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});

export default App;
