import AdminLayout from '@/modules/admin/components/layouts/AdminLayout.vue'
import AdminList from '@/modules/admin/views/admin/AdminList.vue'
import BookingList from '@/modules/admin/views/BookingList.vue'
import Bookings from '@/modules/admin/views/Bookings.vue'
import ContactList from '@/modules/admin/views/contact/ContactList.vue'
import Dashboard from '@/modules/admin/views/Dashboard.vue'
import Rooms from '@/modules/admin/views/Room.vue'
import Profile from '@/modules/admin/views/Profile.vue'
import Properties from '@/modules/admin/views/Properties.vue'
import RoomType from '@/modules/admin/views/RoomType.vue'
import ServiceList from '@/modules/admin/views/service/ServiceList.vue'
import Tables from '@/modules/admin/views/Tables.vue'
import UserCreate from '@/modules/admin/views/user/UserCreate.vue'
import UserList from '@/modules/admin/views/user/UserList.vue'
import Errors from '@/views/Errors.vue'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/admins',
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: Dashboard,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'tables',
        name: 'AdminTables',
        component: Tables,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'properties',
        name: 'AdminProperties',
        component: Properties,
        meta: { requiresAdmin: true, requiresSuperAdmin: true },
      },
      {
        path: 'bookings',
        name: 'AdminBookings',
        component: Bookings,
        meta: { requiresAdmin: true },
      },
      {
        path: 'bookings-list',
        name: 'BookingList',
        component: BookingList,
        meta: { requiresAdmin: true },
      },
      {
        path: 'room-types',
        name: 'AdminRoomTypes',
        component: RoomType,
        meta: { requiresAdmin: true },
      },
      {
        path: '/',
        redirect: '/admins/login',
      },
      {
        path: 'services',
        name: 'AdminServiceList',
        component: ServiceList,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'contacts',
        name: 'AdminContactList',
        component: ContactList,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'rooms',
        name: 'Rooms',
        component: Rooms,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'users',
        name: 'AdminUserList',
        component: UserList,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'users/create',
        name: 'AdminUserCreate',
        component: UserCreate,
        meta: { requiresAuth: true, requiresAdmin: true },
      },
      {
        path: 'admin-accounts',
        name: 'Adminlist',
        component: AdminList,
        meta: { requiresAuth: true, requiresAdmin: true, requiresSuperAdmin: true },
      },
      {
        path: 'profile',
        name: 'AdminProfile',
        component: Profile,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/admins/login',
    name: 'AdminLogin',
    component: () => import('@/modules/admin/views/Auth/Login.vue'),
  },
  {
    path: '/error-403',
    name: 'Error403',
    component: Errors,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
