import { useQuery } from '@apollo/client';
import ErrorMsg from './ErrorMsg';
import { Spin } from 'antd';


export default function SingleItem({query, variables,  itemPath, itemRenderer}) {
  const { error, data, loading } = useQuery(query, { variables: variables });
  if (loading) return <div><Spin /></div>;

  if (error) return ErrorMsg(error.message);

  const item = itemPath.split('.').reduce((prev, cur) => prev[cur], data);
  return (
    <div>
      {itemRenderer(item)}
    </div>
  );
}
