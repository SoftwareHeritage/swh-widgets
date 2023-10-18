import SearchOrigins from './widgets/Search';
import Directory from './widgets/Directory';
import Origins from './widgets/Origins';
import { Row, Col } from 'antd';

function App() {
  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={12}>
        <SearchOrigins query="swh-storage/" />
      </Col>
      <Col className="gutter-row" span={12}>
        <Directory dirSWHID="swh:1:dir:03b8fa5c5bf1ec7cfc538e2a442e5610438e2955" />
      </Col>

      {/* <Col className="gutter-row" span={8}> */}
      {/*   <Directory dirSWHID="swh:1:dir:4c1394ffe602a0f9c6c5fa43d3ee91577f0b9003" /> */}
      {/* </Col> */}

      {/* <Col className="gutter-row" span={8}> */}
      {/*   <SearchOrigins /> */}
      {/* </Col> */}
      {/* <div> */}
      {/*   <Origins /> */}
      {/* </div> */}
    </Row>
  );
}

export default App;
