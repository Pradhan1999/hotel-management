const roomsEndpoints = {
  getAllRooms: {
    uri: '/rooms',
    method: 'GET',
    version: '',
  },
  addRooms: {
    uri: '/rooms',
    method: 'POST',
    version: '',
  },
  getSingleRoom: {
    uri: '/rooms/:id',
    method: 'GET',
    version: '',
  },
  updateRoom: {
    uri: '/rooms/:id',
    method: 'PUT',
    version: '',
  },
  deleteRoom: {
    uri: '/rooms/:id',
    method: 'PUT',
    version: '',
  },
};

export default roomsEndpoints;
