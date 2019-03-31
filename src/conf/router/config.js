exports.beforeLoad = () => {
};

exports.afterLoad = () => {
};

exports.loadRouter = (router) => {
  const _router = router;
  _router.path = _router.path.replace(/main/g, '');
};
