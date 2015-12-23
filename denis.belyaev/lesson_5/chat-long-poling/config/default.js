module.exports = {
    root: process.cwd(),
    mongoDB: {
        url: 'mongodb://localhost/chat',
        user: '',
        password: ''
    },
    secret: 'secret',
    uploadFile: {
        allowedUrl: {
            tmp: ['saveTmp'],
            disc: ['saveDisc'],
        }
    }
}