import React from 'react';
import { gql } from '@apollo/client';
import {  Row, Col, Avatar, Divider, Typography, Space } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import SingleItem from './SingleItem';
import ContextInfo from '../items/ContextInfo';
import BaseWidget from './Base';

const CONTENT_QUERY = gql`
  query getContent($swhid: SWHID!) {
    contentsBySWHID(swhid: $swhid) {
      swhid
      length
      data {
        raw {
          text
        }
        url
      }
    }
  }
`;

const { Text, Link, Paragraph } = Typography;

class ContentWidget extends BaseWidget {
  constructor(props) {
    super(props);
    this.props.setHeading("Content Widget");
  }

  contentInfo = (content) => {
    const cn = content[0];  // This returns a simple list
    return (
      <Row gutter={16}>
        <Col className="gutter-row">
          <Avatar icon={<FileOutlined />}
                  size={ 60 }
                  style={{ backgroundColor: '#1677FF' }}
          />
        </Col>
        <Col className="gutter-row" span={19}>
          <Space direction="vertical">
            {this.props.variables.name? <ContextInfo contextList={this.getparents(this.props.variables.name)} />: ''}
            <Text code>{cn.swhid}</Text>
            <Text type="secondary">Length {cn.length} bytes</Text>
            <Link href={cn.data.url}>Download</Link>
          </Space>
        </Col>
        <Divider />
        <Paragraph className="source-code" ellipsis={{
          rows: 10,
          expandable: true,
          onExpand: this.typoExpand
        }}>
          { cn.data.raw? cn.data.raw.text: <Link href={cn.data.url}>File is too big to show. Download instead</Link> }
        </Paragraph>
      </Row>
    );
  }

  render() {
    return (
      <SingleItem
        query={CONTENT_QUERY}
        variables={{swhid: this.props.variables.swhid}}
        itemPath={'contentsBySWHID'}
        itemRenderer={this.contentInfo}
      />
    );
  }
}

export default ContentWidget;
