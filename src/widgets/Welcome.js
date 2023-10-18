import React, { Component } from 'react';
import { render } from 'react-dom';
import Widget from './Widget';
import { Button , Input, Row, Col, Skeleton, List, Avatar, Divider, Typography, Space } from 'antd';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

class WelcomeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Widget heading={ "Welcome" }>
        <Text>Default Widget View</Text>
      </Widget>
    );
  }
}

export default WelcomeWidget;
