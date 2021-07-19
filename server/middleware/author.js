const { analysisToken } = require("../utils/token");

const whiteList = ["/admin"];

module.exports = () => {
  return async (ctx, next) => {
    for (let i = 0; i < whiteList.length; i++) {
        const item = whiteList[i];
        if (ctx.url.includes(item)) {
            // 拿到token
            const raw = String(ctx.headers.token);
            // 如果没有token
            if (raw === "undefined") {
              return ctx.throw(403, "No access");
            }
            try {
              // 解token
              analysisToken(raw);
              await next();
            } catch (err) {
              console.log(err)
              ctx.throw(403, "No access");
            }
          } else {
              await next()
          }
    }
  };
};
