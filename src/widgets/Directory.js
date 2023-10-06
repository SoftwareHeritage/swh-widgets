import React, { Component } from 'react';
import { render } from 'react-dom';
import useState from 'react';
import { gql } from '@apollo/client';
import PaginatedList from './PaginatedList';
import Widget from './Widget';
import { Button , Input, Row, Col, Skeleton, List, Avatar, Divider } from 'antd';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';


const DIR_QUERY = gql`
  query getDirEntry($swhid: SWHID!, $first: Int!, $after: String) {
    directory(swhid: $swhid) {
      id
      entries(first: $first, after: $after) {
        totalCount
        edges
        {
          node {
            name {
              text
            }
            target {
              swhid
              type
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;


class Directory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dirSWHIDText: props.dirSWHID,
      dirSWHIDVal: props.dirSWHID
    };
  }

  handleChange = (event) => {
    this.setState({dirSWHIDText: event.target.value});
  }

  onLoadClicked = (event) => {
    this.setState({dirSWHIDVal: this.state.dirSWHIDText});
  }

  directoryItem = (edge, index) => {
    let avatar = <Avatar icon={<FileOutlined />}
                         style={{ backgroundColor: '#1677FF' }}
                         shape="square"
                 />;
    if (edge.node.target.type == "directory") {
      avatar = <Avatar icon={<FolderOutlined />}
                       style={{ backgroundColor: '#f56a00' }}
                       shape="square"
               />;
    }
    return (
      <List.Item.Meta
        avatar={ avatar }
        title={edge.node.name.text}
        description={edge.node.target.swhid}
      />
    );
  }

  render() {
    return (
      <Widget heading={ "Directory View" }>
        <Row gutter={16}>
          <Col className="gutter-row" span={18}>
            <Input
              value={this.state.dirSWHIDText}
              autoFocus="autofocus"
              onChange={this.handleChange}
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Button type="primary" onClick={this.onLoadClicked}>Load</Button>
          </Col>
        </Row>
        <Divider />
        <PaginatedList query={DIR_QUERY}
                       variables={{swhid: this.state.dirSWHIDVal, first: 10}}
                       edgesPath={'directory.entries.edges'}
                       pageInfoPath={'directory.entries.pageInfo'}
                       nodeRenderer={this.directoryItem} />
      </Widget>
    );
  }
}

export default Directory;
