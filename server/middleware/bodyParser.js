const qs = require('querystring');
module.exports = () => {
    return async (ctx, next) => {
        // 没有数据
        if (!ctx.headers['content-type']) {
            await next();
        } else {
            const body = await new Promise(res => {
                // 获取post数据
                let str = '';
                ctx.req.on('data', chunk => {
                    str += chunk;
                });
                ctx.req.on('end', () => {
                    // 原生form表单
                    if (ctx.headers['content-type'] === 'application/x-www-form-urlencoded') {
                        res(qs.parse(str));
                    } else { // axios
                        res(JSON.parse(str));
                    }
                });
            });
            ctx.request.body = body;
            await next();
        }
    };
};