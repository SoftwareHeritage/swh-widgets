import React from 'react';
import { Card, Tag, Space, Typography, Badge } from 'antd';
import DirectoryWidget from './Directory';
import ContentWidget from './Content';
import SearchWidget from './Search';
import WelcomeWidget from './Welcome';
import OriginWidget from './Origin';
import VisitsWidget from './Visits';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title } = Typography;

const mapping = {
  directory: DirectoryWidget,
  content: ContentWidget,
  search: SearchWidget,
  origin: OriginWidget,
  visits: VisitsWidget,
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
      const newIndex = this.state.historyIndex + 1;
      let newHistory = this.state.history.slice();
      newHistory.splice(newIndex, 0, [type, variables]);
      this.setState({
        history: newHistory,
        historyIndex: newIndex,
        type: type,
        variables: variables,
      });
    } else {
      this.setState({
        type: type,
        variables: variables,
      });
    }
  }

  setHeading = (title) => {
    this.setState({heading: title});
  }

  onBackClicked = () => {
    if (this.state.historyIndex > 0) {
      const newIndex = this.state.historyIndex - 1;
      const historyItem = this.state.history[newIndex];
      this.loadWidget(historyItem[0], historyItem[1], false);
      this.setState({
        historyIndex: newIndex
      });
    }
  }

  onForwardClicked = () => {
    if (this.state.historyIndex < (this.state.history.length-1)) {
      const newIndex = this.state.historyIndex + 1;
      const historyItem = this.state.history[newIndex];
      this.loadWidget(historyItem[0], historyItem[1], false);
      this.setState({
        historyIndex: newIndex
      });
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
    if (this.props.context === true) {
      return (
        <Component variables={this.state.variables} loadWidget={this.loadWidget} setHeading={this.setHeading} />
      );
    }

    return (
      <Card title={ this.getTitle() }>
        {/* Add a router here */}
        <Component variables={this.state.variables} loadWidget={this.loadWidget} setHeading={this.setHeading} />
          <Tag color="success">
            <a href="https://archive.softwareheritage.org/" target="_blank" rel="noreferrer">
              SWH APIs
            </a>
          </Tag>
      </Card>
    );
  }
}

export default SWHWidget;
