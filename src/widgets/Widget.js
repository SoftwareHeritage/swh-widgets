import React, { Component } from 'react';
import { Card, Row, Col, Tag, Avatar } from 'antd';

class Widget extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card title={ this.props.heading }>
        <div>
          { this.props.children }
        </div>
        <div>
          <Tag color="success">SWH APIs</Tag>
        </div>
      </Card>
    );
  }
}

export default Widget;
