import { callApi } from '../apiUtils';
import roomsEndpoints from '../endpoints/rooms';

export const addRooms = async ({ body }) =>
  callApi({
    uriEndPoint: {
      ...roomsEndpoints.addRooms,
    },
    body,
  });

export const getAllRooms = async ({ query }) =>
  callApi({
    uriEndPoint: {
      ...roomsEndpoints.getAllRooms,
    },
    query,
  });

export const getSingleRoom = async ({ pathParams }) =>
  callApi({
    uriEndPoint: {
      ...roomsEndpoints.getSingleRoom,
    },
    pathParams,
  });
