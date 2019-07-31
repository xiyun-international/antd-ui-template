<template>
  <xy-context :breadcrumb="breadcrumb" title="商品列表">
    <search-form @onSearch="onSearch"></search-form>
    <a-table
      class="t-MT24"
      :rowKey="record => record.id"
      :columns="columns"
      :dataSource="listData"
      :pagination="true"
    >
      <template slot="action">
        <router-link to="/biz/detail">
          查看
        </router-link>
      </template>
    </a-table>
  </xy-context>
</template>

<script>
import SearchForm from './form/search.vue';

export default {
  name: 'listDemo',
  data() {
    return {
      breadcrumb: [{ name: '商品管理', path: 'biz/list' }, { name: '商品列表' }],
      searchForm: {},
      columns: [
        {
          title: '单号',
          dataIndex: 'code',
          width: '30%',
        },
        {
          title: '时间',
          dataIndex: 'date',
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      listData: [],
    };
  },
  components: {
    SearchForm,
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表页数据
    getList(params = {}) {
      this.$post('/list', params).then(res => {
        this.listData = res.data.list;
      });
    },

    onSearch(form) {
      this.searchForm = form;
      this.getList({
        ...this.searchForm,
        page: 1,
        pageSize: 10,
      });
    },
  },
};
</script>

<style scoped></style>
