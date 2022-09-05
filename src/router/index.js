import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import EntryCreate from '@/views/entry/Create.vue'
import EntryEdit from '@/views/entry/Edit.vue'
import BudgetList from '@/views/budget/List.vue'
import CategoryList from '@/views/category/List.vue'
import NotFound from '@/views/NotFound.vue'
import NProgress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/entries/create',
    name: 'create-entry',
    component: EntryCreate
  },
  {
    path: '/entries/:id',
    name: 'edit-entry',
    component: EntryEdit,
    props: true,
  },
  {
    path: '/budgets',
    name: 'budgets',
    component: BudgetList
  },
  {
    path: '/budgets/:id',
    name: 'edit-budget',
    component: BudgetList,
    props: true,
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryList
  },
  {
    path: '/categories/:id',
    name: 'edit-category',
    component: CategoryList,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
