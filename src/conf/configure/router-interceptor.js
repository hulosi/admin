import LoginRouterInterceptor from './interceptor/login-router-interceptor';
import NotFoundRouterInterceptor from './interceptor/not-found-router-interceptor';
import TokenConverterInterceptor from './interceptor/token-converter-interceptor';

let notTokenConverter = true;
export default {
  before({ router }) {
    router.beforeEach(async (to, from, next) => {
      try {
        if (notTokenConverter) {
          notTokenConverter = false;
          await TokenConverterInterceptor.intercept();
        }

        await LoginRouterInterceptor.intercept({ to });

        await NotFoundRouterInterceptor.intercept({ to });

        next();
      } catch (error) {
        console.error(error);
      }
    });
  },
};
