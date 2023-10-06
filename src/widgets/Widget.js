import React, { Component } from 'react';
import { Card, Row, Col, Tag } from 'antd';

class Widget extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card hoverable title={ this.props.heading }>
        { this.props.children }
        <div style={{float: 'right'}}>
          <Tag color="success">SWH APIs</Tag>
        </div>
      </Card>
    );
  }
}

export default Widget;
