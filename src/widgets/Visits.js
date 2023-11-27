// Paginated list of origin visits
import React from 'react';
import { gql } from '@apollo/client';
import PaginatedList from './PaginatedList';
import { List, Card } from 'antd';

const VISITS_QUERY = gql`
  query getVisits($url: String!, $first: Int!, $sort: ListOrder, $after: String) {
    origin(url: $url) {
      visits(first: $first, sort: $sort, after: $after) {
        totalCount
        edges {
          node {
            date
            visitId
            type
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

class VisitsWidget extends React.Component {

  constructor(props) {
    super(props);
    this.props.setHeading("Origin Visits Widget");
  }

  visitItem = (edge, index) => {
    return (
      <List.Item>
        <Card title={edge.node.visitId} style={{ width: '100%' }}>
          <p>{edge.node.date}</p>
          <p>{edge.node.type}</p>
        </Card>
      </List.Item>
    );
  }

  render() {
    return (
      <PaginatedList query={VISITS_QUERY}
                     variables={{url: this.props.variables.url, first: 10, sort: 'DESC'}}
                     edgesPath={'origin.visits.edges'}
                     pageInfoPath={'origin.visits.pageInfo'}
                     nodeRenderer={this.visitItem}
      />
    );
  }
}

export default VisitsWidget;
