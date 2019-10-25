const config = process.env.NODE_ENV === 'production' ? require('./secrets/key_prod') : require('./secrets/key_dev')

export default config;
