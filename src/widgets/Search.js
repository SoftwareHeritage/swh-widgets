import React, { Component } from 'react';
import { render } from 'react-dom';
import useState from 'react';
import { gql } from '@apollo/client';
import PaginatedList from './PaginatedList';
import Widget from './Widget';
import { Button , Input, Row, Col, Skeleton, List, Avatar, Divider } from 'antd';

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


class SearchOrigins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQueryText: "test",
      searchQueryVal: "test"
    };
  }

  handleChange = (event) => {
    this.setState({searchQueryText: event.target.value});
  }

  onSearch = (event) => {
    this.setState({searchQueryVal: this.state.searchQueryText});
  }

  resultItem = (edge, index) => {
    return (
      <div key={index}>
        <span>{edge.node.url}</span>
      </div>
    );
  }

  render() {
    return (
      <Widget heading={"SWH search"}>
        <Row gutter={16}>
          <Col className="gutter-row" span={18}>
            <Input type="text"
                   value={this.state.searchQueryText}
                   autoFocus="autofocus"
                   onChange={this.handleChange}
            />
          </Col>
          <Col className="gutter-row" span={6}>
            <Button type="primary" onClick={this.onSearch}>Search</Button>
          </Col>
        </Row>
        <Divider />
        <PaginatedList query={SEARCH_QUERY}
                       variables={{query: this.state.searchQueryVal, first: 10}}
                       edgesPath={'originSearch.edges'}
                       pageInfoPath={'originSearch.pageInfo'}
                       nodeRenderer={this.resultItem} />
      </Widget>
    );
  }
}

export default SearchOrigins;
