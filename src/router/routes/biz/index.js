import List from '@/views/biz/list.vue';
import Detail from '@/views/biz/detail.vue';
import Create from '@/views/biz/create.vue';

export default [
  {
    path: 'biz/list',
    name: 'biz/list',
    component: List,
  },
  {
    path: 'biz/detail',
    name: 'biz/detail',
    component: Detail,
  },
  {
    path: 'biz/create',
    name: 'biz/create',
    component: Create,
  },
];
