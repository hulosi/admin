import {
  Page,
  Signal,
  Router,
  Store,
  Validator,
  Lang,
  Error,
  Loading,
} from '@candy/ui/mixin';
import {
  menu,
  user,
} from 'mx@';

export default {
  mixins: [
    Page,
    Signal,
    Router,
    Store,
    Validator,
    Lang,
    Error,
    menu,
    user,
    Loading,
  ],
  methods: {
  },
  created() {
  },
};
