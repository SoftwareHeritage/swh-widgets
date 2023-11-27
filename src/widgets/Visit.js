import React from 'react';
import SingleItem from './SingleItem';
import { gql } from '@apollo/client';

const VISIT_QUERY = gql`
  query getVisit() {
  }
`;

class VisitWidget extends React.Component {

  render() {
    return (
      "Visit"
    );
  }
}

export default VisitWidget;
