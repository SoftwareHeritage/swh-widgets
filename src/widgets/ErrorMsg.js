import {  Typography } from 'antd';

const { Text, Paragraph } = Typography;

export default function ErrorMsg(msg) {
  if(!msg) {
    msg = "An unknown error";
  }
  return (
    <Paragraph>
      <Text type="danger">Error: </Text>
      <Text code>{msg}</Text>
    </Paragraph>
  );
}
