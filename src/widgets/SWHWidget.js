import React, { Component } from 'react';
import { Card, Row, Col, Tag, Avatar } from 'antd';
import DirectoryWidget from './Directory';
import ContentWidget from './Content';
import SearchWidget from './Search';
import WelcomeWidget from './Welcome';


const mapping = {
  directory: DirectoryWidget,
  content: ContentWidget,
  search: SearchWidget
};

class SWHWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      variables: this.props.variables,
      history: [],
      historyIndex: -1
    };
  }

  loadWidget = (type, variables) => {
    this.setState({
      type: type,
      variables: variables
    });
  }

  render() {
    if(this.state.type in mapping) {
      const Widget = mapping[this.state.type];
      // Add to history and increment historyIndex by 1
      return (
        <Widget variables={this.state.variables} loadWidget={this.loadWidget} />
      );
    }
    return <WelcomeWidget />;
  }
}

export default SWHWidget;
