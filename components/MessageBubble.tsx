// components/MessageBubble.tsx
import { StyleSheet, Text, View } from 'react-native';
import Message from '../types/message';

type MessageBubbleProps = {
  message: Message;
};

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isMe = message.sender === 'me';
  return (
    <View style={[styles.container, isMe ? styles.right : styles.left]}>
      <View style={[styles.bubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
        <Text style={styles.text}>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    flexDirection: 'row',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  bubbleLeft: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 0,
  },
  bubbleRight: {
    backgroundColor: '#0078fe',
    borderBottomRightRadius: 0,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});

export default MessageBubble;