# Run server

### `yarn start`
Open [http://localhost:3000](http://localhost:3000).

# How to embed a Widget

Add JS scripts

Add the follwing tag in the desired position

``<SWHWidget type="<widget-type>" variables={<vars>} />``

eg:

## Directory widget

``<SWHWidget type="directory" variables={{"swhid": "swh:1:dir:03b8fa5c5bf1ec7cfc538e2a442e5610438e2955"}} />``

## Content

``<SWHWidget type="content" variables={{"swhid": "swh:1:cnt:61c750e88335e4a32e34b04d8509c45636644f37"}} />``

## Search

``<SWHWidget type="search" variables={{"query": "swh-storage/"}} />``
