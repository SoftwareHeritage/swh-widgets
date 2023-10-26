import { useQuery } from '@apollo/client';
import ErrorMsg from './ErrorMsg';
import { List, Button, Spin } from 'antd';

export default function PaginatedList({query, variables, edgesPath, pageInfoPath, nodeRenderer, infoRenderer}) {
  const { error, data, loading, fetchMore } = useQuery(query, { variables: variables });

  if (loading) return <div><Spin /></div>;

  if (error) return ErrorMsg(error);

  const edgesList = edgesPath.split('.').reduce((prev, cur) => prev[cur], data);
  const pageInfo = pageInfoPath.split('.').reduce((prev, cur) => prev[cur], data);

  return (
    <List>
      {edgesList.map((edge, index) => (
        <List.Item key={index}>
          {nodeRenderer(edge, index)}
        </List.Item>

      ))}
      {pageInfo["hasNextPage"] && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button
            onClick={() =>
              fetchMore({
                variables: {after: pageInfo["endCursor"]}
              })
            }
          >
            Load More..
          </Button>
        </div>
      )}
    </List>
  );
}
