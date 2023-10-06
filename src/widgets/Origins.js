// show all the origins
import React, { Component } from 'react';
import { render } from 'react-dom';
import { gql } from '@apollo/client';
import PaginatedList from './PaginatedList';
import Widget from './Widget';

const ORIGINS_QUERY = gql`
  query getOrigins($first: Int!, $after: String) {
    origins(first: $first, after: $after) {
      edges
      {
        node {
          url
          latestVisit {
            date
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;


class Origins extends React.Component {
  constructor(props) {
    super(props);
  }

  originItem = (edge, index) => {
    return (
      <div key={index}>
        <span>{edge.node.url}</span>
        <span>{edge.node.latestVisit.date.slice(0, 10)}</span>
      </div>
    );
  }

  render() {
    return (
      <Widget heading="Browse SWH Origins">
        <PaginatedList query={ORIGINS_QUERY}
                       variables={{first: 10}}
                       edgesPath={'origins.edges'}
                       pageInfoPath={'origins.pageInfo'}
                       nodeRenderer={this.originItem} />
      </Widget>
    );
  }
}

export default Origins;
