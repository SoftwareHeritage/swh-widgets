import React from 'react';
import { gql } from '@apollo/client';
import PaginatedList from './PaginatedList';
import { Row, Col, List, Avatar, Divider, Typography } from 'antd';
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


const { Text } = Typography;


class SearchWidget extends React.Component {
  constructor(props) {
    super(props);
    this.props.setHeading("Search Widget");
  }


  resultItem = (edge, index) => {
    return (
      <List.Item.Meta
        className="clickable"
        title={edge.node.url}
        onClick={() =>
          this.props.loadWidget("origin", {url: edge.node.url})
        }
      />
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
          <Text>Search results for </Text><Text code>{this.props.variables.query}</Text>
        </Col>
        <Divider />
      </Row>
    );
  }

  render() {
    return (
      <PaginatedList query={SEARCH_QUERY}
                     variables={{query: this.props.variables.query, first: 10}}
                     edgesPath={'originSearch.edges'}
                     pageInfoPath={'originSearch.pageInfo'}
                     nodeRenderer={this.resultItem}
                     infoRenderer={this.searchInfo} />
    );
  }
}

export default SearchWidget;
