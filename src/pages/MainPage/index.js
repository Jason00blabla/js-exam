import React from 'react';
import { Connect } from 'aws-amplify-react';
import { graphqlOperation } from 'aws-amplify';

import { listRooms } from 'graphql/queries';
import { onCreateRoom } from 'graphql/subscriptions';

import RoomList from 'components/RoomList';
import CreateRoomView from 'containers/CreateRoomView';

import style from './MainPage.module.scss';

const MainPage = props => (
  <div className={style.Mainpage}>
    <div className={`${style.column} ${style.list}`}>
      {/* TODO: Room list with with lazy-loading next dataset. Here we load 1000 rooms instead. */}
      <Connect
        query={graphqlOperation(listRooms, { limit: 1000 })}
        subscription={graphqlOperation(onCreateRoom)}
        onSubscriptionMsg={(prev, { onCreateRoom: createdRoom }) => {
          console.log('subscription prev: ', prev);
          console.log('subscription createdRoom: ', createdRoom);
          prev.listRooms.items.unshift(createdRoom);
          return prev;
        }}
      >
        {({ data: { listRooms: rooms }, loading, error }) => {
          console.log('rooms: ', rooms);
          if (error) return <h3>Error</h3>;
          if (loading || !listRooms) return <RoomList isLoading={loading} />;
          return <RoomList rooms={rooms.items} isLoading={loading} />;
        }}
      </Connect>
    </div>
    <div className={`${style.column} ${style.createRoom}`}>
      <CreateRoomView {...props} />
    </div>
  </div>
);

export default MainPage;
