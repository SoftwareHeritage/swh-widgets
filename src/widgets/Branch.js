import BaseWidget from './Base';

// const BRANCH_QUERY = gql`
//   query getBranch($snapshot: SWHID!, name: String) {
//     getBranch(swhid: $swhid) {
//       swhid
//       length
//       data {
//         raw {
//           text
//         }
//         url
//       }
//     }
//   }
// `;

class BranchWidget extends BaseWidget {

  // take snapshot and a branch name
  render() {
    return (
      "Branch"
    );
  }
}

export default BranchWidget;
