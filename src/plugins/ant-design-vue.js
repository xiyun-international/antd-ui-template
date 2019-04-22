import Vue from 'vue';
import {
  Alert,
  Badge,
  Button,
  Breadcrumb,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  LocaleProvider,
  Menu,
  Modal,
  Pagination,
  Radio,
  Row,
  Spin,
  Select,
  Switch,
  Steps,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tooltip,
  Upload,
  message,
  Card,
} from 'ant-design-vue';

Pagination.props.showQuickJumper = {
  type: Object,
  default() {
    return { goButton: <a-button class="ant-pagination-go-button">跳转</a-button> };
  },
};

Vue.component(Alert.name, Alert);
Vue.component(Badge.name, Badge);
Vue.component(Button.name, Button);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(Breadcrumb.Item.name, Breadcrumb.Item);
Vue.component(Cascader.name, Cascader);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Checkbox.Group.name, Checkbox.Group);
Vue.component(Col.name, Col);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Dropdown.name, Dropdown);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Icon.name, Icon);
Vue.component(Input.name, Input);
Vue.component(Input.TextArea.name, Input.TextArea);
Vue.component(Input.Group.name, Input.Group);
Vue.component(Input.Search.name, Input.Search);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Layout.name, Layout);
Vue.component(Layout.Content.name, Layout.Content);
Vue.component(Layout.Footer.name, Layout.Footer);
Vue.component(Layout.Header.name, Layout.Header);
Vue.component(Layout.Sider.name, Layout.Sider);
Vue.component(LocaleProvider.name, LocaleProvider);
Vue.component(Menu.name, Menu);
Vue.component(Menu.Item.name, Menu.Item);
Vue.component(Menu.ItemGroup.name, Menu.ItemGroup);
Vue.component(Menu.SubMenu.name, Menu.SubMenu);
Vue.component(Modal.name, Modal);
Vue.component(Pagination.name, Pagination);
Vue.component(Radio.name, Radio);
Vue.component(Radio.Group.name, Radio.Group);
Vue.component(Radio.Button.name, Radio.Button);
Vue.component(Row.name, Row);
Vue.component(Spin.name, Spin);
Vue.component(Select.name, Select);
Vue.component(Select.Option.name, Select.Option);
Vue.component(Switch.name, Switch);
Vue.component(Steps.name, Steps);
Vue.component(Steps.Step.name, Steps.Step);
Vue.component(Table.name, Table);
Vue.component(Tabs.name, Tabs);
Vue.component(Tabs.TabPane.name, Tabs.TabPane);
Vue.component(Tag.name, Tag);
Vue.component(TimePicker.name, TimePicker);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Upload.name, Upload);
Vue.component(Dropdown.name, Dropdown);
Vue.component(Card.name, Card);
Vue.component(DatePicker.MonthPicker.name, DatePicker.MonthPicker);

message.config({
  maxCount: 1,
});
