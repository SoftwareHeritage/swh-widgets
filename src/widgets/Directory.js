import React, { Component } from 'react';
import { render } from 'react-dom';
import useState from 'react';
import { gql } from '@apollo/client';
import PaginatedList from './PaginatedList';
import Widget from './Widget';
import { Button , Input, Row, Col, Skeleton, List, Avatar, Divider, Typography, Space } from 'antd';
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

const { Text, Link } = Typography;

class DirectoryWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  dirListItem = (edge) => {
    return (
      <List.Item.Meta
        style={{cursor: "pointer"}}
        onClick={() =>
          this.props.loadWidget("directory", {swhid: edge.node.target.swhid})
        }
        avatar={<Avatar icon={<FolderOutlined />}
                        style={{ backgroundColor: '#f56a00' }}
                        shape="square"
                />}
        title={edge.node.name.text}
        description={edge.node.target.swhid}
      />
    );
  }

  contentListItem = (edge) => {
    return (
      <List.Item.Meta
        style={{cursor: "pointer"}}
        onClick={() =>
          this.props.loadWidget("content", {swhid: edge.node.target.swhid})
        }
        avatar={<Avatar icon={<FileOutlined />}
                       style={{ backgroundColor: '#1677FF' }}
                       shape="square"
               />}
        title={edge.node.name.text}
        description={edge.node.target.swhid}
      />
    );
  }

  directoryItem = (edge, index) => {
    if (edge.node.target.type == "directory") {
      return this.dirListItem(edge);
    }
    return this.contentListItem(edge);
  }

  dirInfo = (data) => {
    return (
      <Row gutter={16}>
        <Col className="gutter-row">
          <Avatar icon={<FolderOutlined />}
                  size={ 60 }
                  style={{ backgroundColor: '#f56a00' }}
          />
        </Col>
        <Col className="gutter-row" span={19}>
          <Space direction="vertical">
            <Text code>{this.props.variables.swhid}</Text>
            <Text type="secondary">{data.directory.entries.totalCount} Items</Text>
          </Space>
        </Col>
        <Divider />
      </Row>
    );
  }

  render() {
    return (
      <Widget heading={ "Directory Widget" }>
        <PaginatedList query={DIR_QUERY}
                       variables={{swhid: this.props.variables.swhid, first: 10}}
                       edgesPath={'directory.entries.edges'}
                       pageInfoPath={'directory.entries.pageInfo'}
                       nodeRenderer={this.directoryItem}
                       infoRenderer={this.dirInfo} />
      </Widget>
    );
  }
}

export default DirectoryWidget;
