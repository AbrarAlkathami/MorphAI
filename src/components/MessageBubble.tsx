// components/MessageBubble.tsx
import { StyleSheet, Text, View } from 'react-native';
import Message from '../types/message';


export default function MessageBubble({ message }: { message: Message }) {
  const isMe = message.sender === 'me';

  return (
    <View
      style={[
        styles.bubbleBase,
        isMe ? styles.bubbleRight : styles.bubbleLeft,
        isMe ? styles.alignRight : styles.alignLeft,
      ]}
    >
      <Text style={styles.text}>
        {message.text.length ? message.text : '⚠️ empty text'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleBase: {
    maxWidth: '75%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  bubbleLeft: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 0,
  },
  bubbleRight: {
    backgroundColor: '#0078fe',
    borderBottomRightRadius: 0,
  },
  alignLeft: {
    alignSelf: 'flex-start',
  },
  alignRight: {
    alignSelf: 'flex-end',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});