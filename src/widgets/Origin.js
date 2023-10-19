import React from 'react';
import { gql } from '@apollo/client';
import { Row, Col, Avatar, Divider, Typography, Space } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import SingleItem from './SingleItem';

const ORIGIN_QUERY = gql`
  query getOrigin($url: String!) {
    origin(url: $url) {
      url
      latestVisit {
        date
      }
      latestSnapshot {
        swhid
        headBranch {
          name {
            text
          }
        }
      }
    }
  }
`;

const { Text, Link } = Typography;

class OriginWidget extends React.Component {
  constructor(props) {
    super(props);
    this.props.setHeading("Origin Widget");
  }

  originInfo = (origin) => {
    return (
      <Row gutter={16}>
        <Col className="gutter-row">
          <Avatar icon={<DatabaseOutlined />}
                  size={ 60 }
                  style={{ backgroundColor: '#1677FF' }}
          />
        </Col>
        <Col className="gutter-row" span={19}>
          <Space direction="vertical">
            <Link href={origin.url}>{origin.url}</Link>
            <Text type="secondary">Last Visit {origin.latestVisit.date}</Text>
            <Text type="secondary">Latest snapshot: <code>{origin.latestSnapshot.swhid}</code></Text>
          </Space>
        </Col>
        <Divider />
          <Text>Load the latest directory here using the directory widget</Text>
        <Divider />
      </Row>
    );
  }

  render() {
    return (
      <SingleItem
        query={ORIGIN_QUERY}
        variables={{url: this.props.variables.url}}
        itemPath={'origin'}
        itemRenderer={this.originInfo}
      />
    );
  }
}

export default OriginWidget;