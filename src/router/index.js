import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import EntryCreate from '@/views/entry/Create.vue'
import BudgetList from '@/views/budget/List.vue'
import CategoryList from '@/views/category/List.vue'
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
    path: '/budgets',
    name: 'budgets',
    component: BudgetList
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryList
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
