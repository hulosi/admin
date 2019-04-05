export default class NotFoundRouterInterceptor {
  static async intercept({ to }) {
    if (to.matched.length === 0) {
      window.location.href = 'https://hjl.hscf.com/404.html';
      throw new Error(`The path ${to.path} is not exist, so go to 404`);
    }
  }
}
