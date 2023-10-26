import React from 'react';
import { gql } from '@apollo/client';
import PaginatedList from './PaginatedList';
import { Row, Col, List, Avatar, Divider, Typography, Space } from 'antd';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
import ContextInfo from '../items/ContextInfo';
import BaseWidget from './Base';


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

const { Text } = Typography;

class DirectoryWidget extends BaseWidget {

  constructor(props) {
    super(props);
    this.state = {
      heading: "Directory Widget"
    };
  }

  dirListItem = (edge) => {
    return (
      <List.Item.Meta
        className="clickable"
        onClick={() =>
          this.props.loadWidget("directory", {swhid: edge.node.target.swhid, name: edge.node.name.text})
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
        className="clickable"
        onClick={() =>
          this.props.loadWidget("content", {swhid: edge.node.target.swhid, name: edge.node.name.text})
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
    if (edge.node.target.type === "directory") {
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
            {this.props.variables.name?
             /* <Text strong>{this.props.variables.name}</Text>:'' */
             <ContextInfo contextList={this.getparents(this.props.variables.name)} />: ''
            }

            <Text code>{this.props.variables.swhid}</Text>
            <Text type="secondary">{data.directory.entries.totalCount} Items</Text>
          </Space>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <PaginatedList query={DIR_QUERY}
                     variables={{swhid: this.props.variables.swhid, first: 10}}
                     edgesPath={'directory.entries.edges'}
                     pageInfoPath={'directory.entries.pageInfo'}
                     nodeRenderer={this.directoryItem}
                     infoRenderer={this.dirInfo}
      />
    );
  }
}

export default DirectoryWidget;
