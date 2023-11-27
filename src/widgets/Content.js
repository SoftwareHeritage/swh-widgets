import React from 'react';
import { gql } from '@apollo/client';
import {  Row, Col, Avatar, Divider, Typography, Space } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import SingleItem from './SingleItem';
import ContextInfo from '../items/ContextInfo';
import ErrorMsg from './ErrorMsg';

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

class ContentWidget extends React.Component {
  constructor(props) {
    super(props);
    this.props.setHeading("Content Widget");
  }

  contentInfo = (content) => {
    if (content.length === 0) {
      return ErrorMsg("No content found for this SWHID");
    }
    const cn = content[0];   // This returns a simple list
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
            {this.props.variables.name?
             <ContextInfo contextList={["Path1", "Path2", this.props.variables.name]} />
             :''}
            <Text code>{cn.swhid}</Text>
            <Text type="secondary">Length {cn.length} bytes</Text>
            {cn.length>0?<Link href={cn.data.url}>Download</Link>:''}
          </Space>
        </Col>
        <Divider />
        <Paragraph className={cn.length>0?"source-code":''} ellipsis={{
          rows: 10,
          expandable: true,
          onExpand: this.typoExpand
        }}>
          { cn.data.raw? cn.data.raw.text: <Link href={cn.data.url}>File is too big to display. Download instead</Link> }
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
