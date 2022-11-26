module.exports = {
    apps: [{
        name: 'koo-daxue-node-home',
        script: './bin/server.js',
        exec_mode: 'fork',
        // log
        combine_logs: true,
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        error_file: './logs/pm2LogFiles/err.log',
        out_file: './logs/pm2LogFiles/out.log',

        // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production',
            APP_ENV: process.env.APP_ENV,
            APP_PORT: process.env.APP_PORT,
            APP_NAME: process.env.APP_NAME,
            KOO_ENVIRONMENT: process.env.KOO_ENVIRONMENT
        }
        // env_production: {
        //     APP_ENV: 'product',
        // },
    }]
};
