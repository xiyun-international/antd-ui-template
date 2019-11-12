<template>
  <xy-context :breadcrumb="breadcrumb" title="商品列表">
    <search-form ref="search" @onSearch="onSearch"></search-form>
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
    getList(currentPage, pageSize = 20) {
      const formData = this.$refs.search.form.getFieldsValue();
      if (formData.time) {
        formData.time = formData.time.format('YYYY-MM-DD');
      }
      this.$post('/list', {
        ...formData,
        currentPage,
        pageSize,
      }).then(res => {
        this.listData = res.data;
      });
    },

    // 搜索
    onSearch() {
      this.getList(1);
    },
  },
};
</script>

<style scoped></style>
