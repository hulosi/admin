import {
  Page,
  Signal,
  Router,
  Store,
  Validator,
  Lang,
  Error,
} from '@candy/ui/mixin';
import user from './user';

export default {
  mixins: [
    Page,
    Signal,
    Router,
    Store,
    Validator,
    Lang,
    Error,
    user,
  ],
  methods: {
    to_(url) {
      window.location.href = url;
    },
    goto_(url) {
      window.open(url);
    },
  },
};
