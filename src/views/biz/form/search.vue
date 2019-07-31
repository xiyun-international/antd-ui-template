<template>
  <a-form class="search" :form="form" @submit="handleSearch">
    <a-row :gutter="20">
      <a-col v-bind="searchCol">
        <a-form-item label="订单号" v-bind="searchItem">
          <a-input v-decorator="['deliverId']" placeholder="请输入订单号" />
        </a-form-item>
      </a-col>
      <a-col v-bind="searchCol">
        <a-form-item label="寄件时间" v-bind="searchItem">
          <a-date-picker
            v-decorator="['time']"
            placeholder="请选择寄件时间"
            style="width: 100%"
          ></a-date-picker>
        </a-form-item>
      </a-col>
      <a-col v-bind="searchCol">
        <a-form-item label="发货状态" v-bind="searchItem">
          <a-select v-decorator="['status']" placeholder="请选择">
            <a-select-option value="">全部</a-select-option>
            <a-select-option :value="1">未发货</a-select-option>
            <a-select-option :value="2">已发货</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" justify="end">
      <a-button class="search" type="primary" html-type="submit">
        查询
      </a-button>
      <a-button class="reset t-ML10" @click="handleFormReset">
        重置
      </a-button>
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: 'search-form',
  data() {
    return {
      form: this.$form.createForm(this),
      searchCol: {
        span: 8,
      },
      searchItem: {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 18,
        },
      },
    };
  },
  methods: {
    /**
     *  点击查询
     */
    handleSearch(e) {
      e.preventDefault();
      this.$emit('onSearch', this.form.getFieldsValue());
    },

    // 点击重置
    handleFormReset() {
      this.form.resetFields();
      this.$emit('onSearch', {});
    },
  },
};
</script>
