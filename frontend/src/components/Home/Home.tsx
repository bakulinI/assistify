import { Flex, Typography } from 'antd';
import { FC } from 'react';
const { Title, Text } = Typography;

export const Home: FC = () => {
  return (
    <>
      <Flex className="my-container h-screen pt-5 pb-20 flex-col">
        <img src="src/assets/images/logo.svg" alt="logo" className="max-w-16" />
        <Flex className="bg-white rounded-3xl p-5 flex-col justify-around flex-1">
          <Title className="font-main pt-4 font-bold text-[1.75rem]" level={1}>
            Приветствуем<br></br>
            <Text className="inline-block text-[3.25rem]">
              {/* bg-gradient-to-r from-red-500 to-red-50 bg-clip-text text-transparent  ---- Добавлял это, чтобы сделать градиент в тексте, не сработало*/}
              в assistify!
            </Text>
          </Title>
        </Flex>
      </Flex>
      <div className="w-[440px] h-[440px] bg-[#4096FF66] rounded-full fixed bottom-0 right-0 translate-y-[50%] translate-x-[50%] has-[+button:hover]:w-[500px] has-[+button:hover]:h-[500px] duration-300"></div>
      <button className="w-[440px] h-[440px] bg-[#4096FF] rounded-full fixed bottom-0 right-0 translate-y-[50%] translate-x-[50%]">
        <Text className="block text-white text-[2rem] font-bold absolute top-[25%] left-[18%]">Начать</Text>
      </button>
    </>
  );
};
