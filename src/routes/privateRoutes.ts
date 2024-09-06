import HomePage from '../Page/home/HomePage'
import AllRoomsPage from '../Page/booking_rooms/AllRoomsPage';
import FindBookingPage from  '../Page/booking_rooms/FindBookingPage'
import RoomDetailsBookingPage from '../Page/booking_rooms/RoomDetailsPage'
import ProfilePage from '../Page/profile/ProfilePage';
import EditProfilePage from '../Page/profile/EditProfilePage'
import AdminPage from '../Page/admin/AdminPage'
import ManageRoomPage from '../Page/admin/ManageRoomPage'
import EditRoomPage from '../Page/admin/EditRoomPage'
import AddRoomPage from '../Page/admin/AddRoomPage'
import ManageBookingsPage from '../Page/admin/ManageBookingsPage'
import EditBookingPage from '../Page/admin/EditBookingPage'
const privateRoutes = {
  home: {
    path: '/home',
    component: HomePage
  },
  rooms:{
    path: '/rooms',
    component: AllRoomsPage,
  },
  booking:{
    path: '/find-booking',
    component: FindBookingPage,
  },
  roombook: {
    path: '/room-details-book/:roomId',
    component: RoomDetailsBookingPage
  },
  profile:{
    path: '/profile',
    component: ProfilePage,
  },
  editprofile :{
    path: '/edit-profile',
    component: EditProfilePage,
  },
  admin: {
    path: '/admin',
    component:AdminPage,
  },
  adminrooms: {
    path:'/admin/manage-rooms',
    component:ManageRoomPage
  },
  adminroomsid: {
    path:'/admin/edit-room/:roomId',
    component:EditRoomPage,
  },
  adminaddrom: {
    path:'/admin/add-room',
    component: AddRoomPage,
  },
  adminbookings: {
    path:'/admin/manage-bookings',
    component:ManageBookingsPage
  },
  admineditbooking: {
    path:'/admin/edit-booking/:bookingCode',
    component: EditBookingPage
  },
};

export default privateRoutes;
