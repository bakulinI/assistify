import { FC } from "react";
import { Typography } from "antd";

const {Title} = Typography

export const Home: FC = () => {
  
  
  return (
<div className="my-container">
<Title className="text-white text-center pt-4" level={1}>
  Приветствуем в Assistify
</Title>

{/* <img
  onPointerOver={() => setVisible(true)}
  onPointerOut={() => setVisible(false)}
  src="/logo.svg"
  alt="money"
  className="mb-4"
/> */}
{/* {visible && (
  <img src="https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif" alt="money" />
)} */}

</div>  
  );
};
