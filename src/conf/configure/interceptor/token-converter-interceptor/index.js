import AccessTokenConverter from './access-token-converter';
import Oauth2TokenConverter from './oauth2-token-converter';
import TmTokenConverter from './tm-token-converter';

const converters = [
  new AccessTokenConverter(),
  new Oauth2TokenConverter(),
  new TmTokenConverter(),
];

export default class TokenConverterInterceptor {
  static async intercept() {
    const converter = converters.find(acquirer => acquirer.test());
    if (converter) {
      await converter.convert();
    }
  }
}
