// manage the context
import React from 'react';
import { Card, Tag, Space, Typography, Badge } from 'antd';

class BaseWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      args: props.args,
      data: props.data
    };
  }

  getTitle() {
    return "SWHWidget";
  }

  getHeader() {
    return "Widegt Header";
  }

  getContent() {
    return "Widegt Content";
  }

  getFooter() {
    return (
      <Tag color="success">
        SWH APIs
      </Tag>
    );
  }

  render() {
    // Override to change the entire rendering
    return (
      <Card title={this.getTitle()}>
        {this.props.children}
        {this.getFooter()}
      </Card>
    );
  }
}

export default BaseWidget;
