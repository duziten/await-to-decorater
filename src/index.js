import to from 'await-to-js';

function Atd(errExt) {
  return function(target, name, descriptor) {
    if (typeof descriptor.value === 'function') {
      const func = descriptor.value;

      descriptor.value = function awaitToWrapper(...args) {
        return to.call(null, func(...args), errExt);
      };
    } else if (descriptor.initializer) {
      return {
        enumerable: true,
        configurable: true,
        get() {
          return function awaitToWrapper(...args) {
            const func = descriptor.initializer.call(this);
            if (typeof func !== 'function') return func;
            return to.call(null, func(...args), errExt);
          };
        }
      };
    }

    return descriptor;
  };
}

export default Atd;
