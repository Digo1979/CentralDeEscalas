let componentCount = 0;
let mountedComponents = 0;

export default {
  install(app) {
    app.mixin({
      beforeCreate() {
        componentCount++;
      },
      mounted() {
        mountedComponents++;
        if (mountedComponents === componentCount) {
          window.myGlobalFunction();
        }
      },
    });
  },
};
