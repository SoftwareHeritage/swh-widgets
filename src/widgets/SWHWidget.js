import React from 'react';
import { Card, Tag, Space, Typography, Badge } from 'antd';
import DirectoryWidget from './Directory';
import ContentWidget from './Content';
import SearchWidget from './Search';
import WelcomeWidget from './Welcome';
import OriginWidget from './Origin';
import VisitWidget from './Visit';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title } = Typography;

const mapping = {
  directory: DirectoryWidget,
  content: ContentWidget,
  search: SearchWidget,
  origin: OriginWidget,
  visit: VisitWidget,
};

class SWHWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      variables: this.props.variables,
      data: this.props.data,
      history: [[this.props.type,
                 this.props.variables]],
      historyIndex: 0,
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

  setHeading = () => {
  }

  render() {
    const Component = mapping[this.state.type] || WelcomeWidget;
    return (
      // router
      <div>
        dfd
        <Component variables={this.state.variables} data={this.props.data} loadWidget={this.loadWidget} setHeading={this.setHeading} />
      </div>
    );
  }
}

export default SWHWidget;
