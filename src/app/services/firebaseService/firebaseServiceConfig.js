const config = process.env.NODE_ENV === 'production' ? require('./secrets/key_dev') : require('./secrets/key_prod')

export default config;
