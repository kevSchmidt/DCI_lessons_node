// wrap our async functions into catchAsync to get rid of try/catch blocks.
// catchAsync is called first and then call the wrapped function.

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
