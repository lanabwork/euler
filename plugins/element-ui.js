import Vue from 'vue';
import {
  Row,
  Col,
  Card,
  Form,
  FormItem,
  Input,
  Button,
  Message,
} from 'element-ui';

Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);

Vue.prototype.$message = Message;
