import React from 'react';
import { Breadcrumb } from 'antd';

class ContextInfo  extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contextList: this.props.contextList
    };
  }

  itemRender(item) {
    return "Hello";
  }

  render() {
    return (
      <Breadcrumb
        items={
          this.state.contextList.map((item, index) => {
            if (index == 2) {
              return {title: item};
            }
            return {title: item, href: "#"};
          })}
      />
    );
  }
}

export default ContextInfo;
