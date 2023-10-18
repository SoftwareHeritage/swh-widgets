import React, { Component } from 'react';
import { render } from 'react-dom';
import useState from 'react';
import { gql } from '@apollo/client';
import PaginatedList from './PaginatedList';
import Widget from './Widget';
import { Button , Input, Row, Col, Skeleton, List, Avatar, Divider, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const SEARCH_QUERY = gql`
  query Search($query: String!, $first: Int!, $after: String) {
    originSearch(query: $query, first: $first, after: $after) {
      edges {
        node {
          url
          type
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;


const { Text, Link } = Typography;


class SearchOrigins extends React.Component {
  constructor(props) {
    super(props);
  }


  resultItem = (edge, index) => {
    return (
      <List.Item.Meta
        title={edge.node.url}
      />
      // <div key={index}>
      //   <Text>{edge.node.url}</Text>
      // </div>
    );
  }

  searchInfo = (data) => {
    return (
      <Row gutter={16}>
        <Col className="gutter-row">
          <Avatar icon={<SearchOutlined />}
                  size={ 40 }
                  style={{ backgroundColor: '#f56a00' }}
          />
        </Col>
        <Col className="gutter-row" span={19}>
          <Text>Search results for </Text><Text code>{this.props.query}</Text>
        </Col>
        <Divider />
      </Row>
    );
  }

  render() {
    return (
      <Widget heading={"SWH search"}>
        <PaginatedList query={SEARCH_QUERY}
                       variables={{query: this.props.query, first: 10}}
                       edgesPath={'originSearch.edges'}
                       pageInfoPath={'originSearch.pageInfo'}
                       nodeRenderer={this.resultItem}
                       infoRenderer={this.searchInfo} />
      </Widget>
    );
  }
}

export default SearchOrigins;