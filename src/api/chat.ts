import { Platform } from 'react-native';

export interface ChatHistoryItem {
  role: 'human' | 'ai';       // ← match the DB
  content: string;
}

export interface ChatResponse {
  sessionId: string;
  assistantResponse: string;
  chat_history: ChatHistoryItem[];
}

const API_BASE =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000/api'
    : 'http://localhost:3000/api';

/**
 * Send a message and get back the full history + AI reply.
 */
export async function sendChatMessage(
  userMessage: string,
  sessionId?: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userMessage, sessionId }),
  });
  if (!res.ok) {
    throw new Error(`Chat API error: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchChatHistory(
  sessionId: string
): Promise<{ sessionId: string; chat_history: ChatHistoryItem[] }> {
  const res = await fetch(`${API_BASE}/chat/${sessionId}`);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}