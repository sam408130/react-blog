import crypto from 'crypto'

module.exports = {
    MD5_SUFFIX: 'fdsafdsajfklds;ajf;sajdl;发动机阿里；解放东路；撒解放路；打架；@&*^&*^*(^@!)',
    md5: function (pwd) {
        let md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex')
    },
    responseClient(res, httpCode=500, code=3, message='服务端异常', data={}) {
        let responseData = {};
        responseData.code = code;
        responseData.message = message;
        responseData.data = data;
        res.status(httpCode).json(responseData)
    }
}
