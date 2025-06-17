import { StyleSheet, View, TextInput, } from "react-native";
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';

type InputFieldProps = {
  onSend: (message: string) => void;
};

const InputField = ({ onSend }: InputFieldProps) => {
    const [text, setText] = useState('');
    
    const handleSend = () => {
        if (text.trim()) {
        onSend(text); 
        setText('');
        }
    };
    return (
        <View style={styles.wrapper}>
            <View style={styles.inputRow}>
                <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="Ask Anything"
                placeholderTextColor="#777"
                keyboardType="default"
                />
                <IconButton
                icon="send-outline"
                size={24}
                iconColor="#fff"
                onPress={handleSend}
                style={styles.sendButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  input: {
    flex: 1,
    height: 48,
    color: '#fff',
    paddingHorizontal: 12,
  },
  sendButton: {
    margin: 0,
  },
});

export default InputField;
