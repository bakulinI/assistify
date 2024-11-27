import { fetchChatStream } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useChatStream = () => {
  return useMutation(fetchChatStream);
};

// const { messageApi } = useOutletContext<OutletContext>();
// let text = '';
// let offset = 0;
// return useMutation({
//   mutationFn: fetchChatStream,
//   onError: (error: AxiosError<Record<string, string | string[]>>) => {
//     console.log(error);
//     message.error(error.message);
//   },
//   onSuccess: async (data) => {
//     for await (const chunk of data.) {
//       const chunkText = chunk.text();
//       text += chunkText;
//       // inner for-loop used to visually stream messages character-by-character
//       // feel free to remove this loop if you are alright with visually chunky streams
//       for (let i = offset; i < chunkText.length; i++) {
//         // while this example shows params.streamMessage taking in text input,
//         // you may also feed it custom JSX.Element if you wish
//         await params.streamMessage(text.slice(0, i + 1));
//         await new Promise((resolve) => setTimeout(resolve, 30));
//       }
//       offset += chunkText.length;
//     }
//     //   messageApi.success('Ус успешно вошли!');
//   },
// });
