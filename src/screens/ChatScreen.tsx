import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View, FlatList, Platform } from 'react-native';
import Greeting from '../components/Greeting';
import Header from '../components/Header';
import { Provider as PaperProvider } from 'react-native-paper';
import InputField from '../components/InputField'
import MessageBubble from '../components/MessageBubble'
import Message from '../types/message';
import { sendChatMessage, fetchChatHistory } from '../api/chat';
const IOS_SESSION_ID     = '123456';
const ANDROID_SESSION_ID = '12345';

let _msgCounter = 0;
function makeId() {
  return `${Date.now()}-${_msgCounter++}`;
}
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const defaultSessionId =
    Platform.OS === 'android'
      ? ANDROID_SESSION_ID
      : IOS_SESSION_ID;

  const [sessionId, setSessionId] = useState<string>(defaultSessionId);

  // hide greeting after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // load entire chat history on mount (sessionId is already set)
useEffect(() => {
  fetchChatHistory(sessionId)
    .then(({ chat_history }) => {
      // 1) sort oldest → newest
      const sorted = chat_history.slice().sort((a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      // 2) map into your UI messages
      const uiMsgs: Message[] = sorted.map((item, idx) => ({
        id: idx.toString(),
        text: item.content,
        type: 'text',
        sender: item.role === 'ai' ? 'ai' : 'me',
      }));

      setMessages(uiMsgs);
    })
    .catch(console.error);
}, [sessionId]);

const handleSendMessage = async (text: string) => {
  // 1) Optimistic UI: append user message
  const meMsg: Message = { id: makeId(), text, type: 'text', sender: 'me' };
  setMessages(prev => [...prev, meMsg]);

  try {
    // 2) Call backend
    const { sessionId: newSid, assistantResponse } =
      await sendChatMessage(text, sessionId);
    setSessionId(newSid);

    // 3) Append AI reply
    const aiMsg: Message = { id: makeId(), text: assistantResponse, type: 'text', sender: 'ai' };
    setMessages(prev => [...prev, aiMsg]);
  } catch (err) {
    console.error(err);
  }
};



  console.log("🗨️ messages[]:", messages);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.content}>
          {showGreeting ? (
          <Greeting />
        ) : (
          <>
            <Header />
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <MessageBubble message={item} />}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.listContent}
              style={styles.list}
            />
          </>
        )}
      </View>
      {!showGreeting && <InputField onSend={handleSendMessage} />}
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
