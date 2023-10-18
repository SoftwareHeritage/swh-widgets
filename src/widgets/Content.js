import React, { Component } from 'react';
import { render } from 'react-dom';
import useState from 'react';
import { gql } from '@apollo/client';
import PaginatedList from './PaginatedList';
import Widget from './Widget';
import { Button , Input, Row, Col, Skeleton, List, Avatar, Divider, Typography, Space } from 'antd';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
import SingleItem from './SingleItem';

const CONTENT_QUERY = gql`
  query getContent($swhid: SWHID!) {
    contentsBySWHID(swhid: $swhid) {
      swhid
    }
  }
`;

const { Text, Link } = Typography;

class ContentWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  contentInfo = (content) => {
    const cn = content[0];  // This returns a simple list
    return (
      <Row gutter={16}>
        <Col className="gutter-row">
          This is the content widget {cn.swhid}
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Widget heading={ "Content Widget" }>
        <SingleItem
          query={CONTENT_QUERY}
          variables={{swhid: this.props.variables.swhid}}
          itemPath={'contentsBySWHID'}
          itemRenderer={this.contentInfo}
        />
      </Widget>
    );
  }
}

export default ContentWidget;
