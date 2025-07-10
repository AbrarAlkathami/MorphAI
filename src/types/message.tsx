type Message = {
  id: string;
  text: string;
  type: 'text';
  sender: 'me' | 'bot' | string;
};

export default Message;