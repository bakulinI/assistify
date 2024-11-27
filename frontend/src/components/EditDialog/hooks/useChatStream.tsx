import { fetchChatStream } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useChatStream = () => {
  return useMutation(fetchChatStream);
};
