import React from 'react';
import { Card, Tag, Space, Typography, Badge } from 'antd';
import DirectoryWidget from './Directory';
import ContentWidget from './Content';
import SearchWidget from './Search';
import WelcomeWidget from './Welcome';
import OriginWidget from './Origin';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title } = Typography;

const mapping = {
  directory: DirectoryWidget,
  content: ContentWidget,
  search: SearchWidget,
  origin: OriginWidget,
};

class SWHWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      heading: "SWH Widget",
      variables: this.props.variables,
      history: [[this.props.type,
                 this.props.variables]],
      historyIndex: 0,
      context: []
    };
  }

  loadWidget = (type, variables, inHistory=true) => {
    if (inHistory === true) {
      this.state.history.splice(this.state.historyIndex+1, 0, [type, variables]);
      this.state.historyIndex += 1;
    }

    this.setState({
      type: type,
      variables: variables,
    });
  }

  setHeading = (title) => {
    this.setState({heading: title});
  }

  onBackClicked = () => {
    if (this.state.historyIndex > 0) {
      // Ge the item and
      this.state.historyIndex -= 1;
      const historyItem = this.state.history[this.state.historyIndex];
      // const type, vars = this.state.history[this.state.historyIndex];
      this.loadWidget(historyItem[0], historyItem[1], false);
    }
  }

  onForwardClicked = () => {
    if (this.state.historyIndex < (this.state.history.length-1)) {
      // Ge the item and
      this.state.historyIndex += 1;
      const historyItem = this.state.history[this.state.historyIndex];
      // const type, vars = this.state.history[this.state.historyIndex];
      this.loadWidget(historyItem[0], historyItem[1], false);
    }
  }

  getTitle = () => {
    return (
      <Title level={4}>
        <Space>
          <Badge count={this.state.historyIndex} size="small">
            <ArrowLeftOutlined className="clickable" onClick={this.onBackClicked} />
          </Badge>
          <Badge count={this.state.history.length-this.state.historyIndex-1} size="small">
            <ArrowRightOutlined className="clickable" onClick={this.onForwardClicked} />
          </Badge>
          {this.state.heading}
        </Space>
      </Title>
    );
  }

  render() {
    const Component = mapping[this.state.type] || WelcomeWidget;
    if (this.props.context == true) {
      return (
        <Component variables={this.state.variables} loadWidget={this.loadWidget} setHeading={this.setHeading} />
      );
    }

    return (
      <Card title={ this.getTitle() }>
        <Component variables={this.state.variables} loadWidget={this.loadWidget} setHeading={this.setHeading} />
        <div>
          <Tag color="success">SWH APIs</Tag>
        </div>
      </Card>
    );
  }
}

export default SWHWidget;
