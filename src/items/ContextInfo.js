import React from 'react';
import { Breadcrumb } from 'antd';

class ContextInfo  extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contextList: this.props.contextList
    };
  }

  render() {
    return (
      <Breadcrumb
        items={
          this.state.contextList.map((item, i) => {
            if (i===this.state.contextList.length-1) {
              return {title: item};
            } else {
              return {title: item, href: "#"};
            }
          })}
      />
    );
  }
}

export default ContextInfo;
