import { Button, ColorPicker, Flex, Typography } from 'antd';
import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBot, {Flow, Settings} from "react-chatbotify";
const { Title } = Typography;
import type { ColorPickerProps, GetProp } from 'antd';
type Color = GetProp<ColorPickerProps, 'value'>;

export const Home: FC = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [color,setColor] = useState<Color>("red")
  const flow : Flow = {
    start: {

      message: "Привет, кто ты?",
      path: "middle"
    },
    middle: {
      message: "лови свое имя",
      path: "end"
    },
    end: {
      message: (params) => `Hi ${params.userInput}!`,
   
    }
  }

  const settings : Settings = useMemo(() => (  {
    device:{ 
      // mobileEnabled:true,
      desktopEnabled:true,
    },
    botBubble:{
      showAvatar:true
    },
    audio:{
      voiceNames:['Google русский (ru-RU)'],
      disabled:false,
     
      language:'ru-RU'
    },
    voice:{
      language:'ru-RU',
    
      disabled:false
    },
    general: {
     primaryColor:color as string,
      embedded: false
    },
    tooltip: {
      mode: "CLOSE",
      text: "Talk to me! 😊",
    },
    chatHistory: {
      storageKey: "conversations_summary"
    }
  }),[color]) 
  console.log(settings.general.primaryColor)

  return (
    <>
  
<div className="my-container">
<ColorPicker value={color} onChange={setColor} />
<ChatBot settings={settings} styles={{
  headerStyle:{
     color:color as string,
  }
}} flow={flow}/>

<Title className="text-white text-center pt-4" level={1}>
  Приветствуем в Assistify
</Title>

<img
  onPointerOver={() => setVisible(true)}
  onPointerOut={() => setVisible(false)}
  src="/Logo.svg"
  alt="money"
  className="mb-4"
/>
{visible && (
  <img src="https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif" alt="money" />
)}
<Flex justify="center">
  <Button onClick={() => navigate('/profile')} color="default" variant="outlined">
    Перейти в профиль
  </Button>

</Flex>
</div>
    </>
   
  );
};
