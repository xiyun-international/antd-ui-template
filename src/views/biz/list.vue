<template>
  <xy-context :breadcrumb="breadcrumb" title="商品列表">
    <search-form ref="search" @onSearch="onSearch"></search-form>
    <a-table
      class="t-MT24"
      :rowKey="record => record.id"
      :columns="columns"
      :dataSource="listData"
      :pagination="pagination"
      @change="handleTableChange"
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

/**
 * 商品列表页路由
 * @route('biz/list')
 */
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
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
    };
  },
  components: {
    SearchForm,
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表页数据
    getList() {
      const formData = this.$refs.search.form.getFieldsValue();
      if (formData.time) {
        formData.time = formData.time.format('YYYY-MM-DD');
      }
      this.$post('/list', {
        ...formData,
        current: this.pagination.current,
        pageSize: this.pagination.pageSize,
      }).then(res => {
        this.listData = res.data;
        this.pagination.total = res.data.total;
      });
    },

    // 搜索
    onSearch() {
      this.pagination.current = 1;
      this.getList();
    },

    // 翻页等
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      pager.pageSize = pagination.pageSize;
      this.pagination = pager;
      this.getList();
    },
  },
};
</script>

<style scoped></style>
