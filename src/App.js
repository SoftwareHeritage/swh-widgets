import { Row, Col } from 'antd';
import SWHWidget from './widgets/SWHWidget';

function App() {
  return (
    <Row gutter={16}>

      <Col className="gutter-row" span={8}>
        <SWHWidget type="search" variables={{"query": "swh-storage/"}} />
      </Col>

      <Col className="gutter-row" span={8}>
        <SWHWidget type="directory" variables={{"swhid": "swh:1:dir:03b8fa5c5bf1ec7cfc538e2a442e5610438e2955"}} />
      </Col>

      {/* <Col className="gutter-row" span={8}> */}
      {/*   <SWHWidget type="directory" variables={{"swhid": "swh:1:dir:4c1394ffe602a0f9c6c5fa43d3ee91577f0b9003"}} /> */}
      {/* </Col> */}


      <Col className="gutter-row" span={7}>
        <SWHWidget type="content" variables={{"swhid": "swh:1:cnt:61c750e88335e4a32e34b04d8509c45636644f37"}} />
      </Col>

      <Col className="gutter-row" span={7}>
        <SWHWidget type="visits" variables={{"url": "https://github.com/python/cpython"}} />
      </Col>

    </Row>
  );
}

export default App;
