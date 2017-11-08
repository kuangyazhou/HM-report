module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [{
        name: 'HeMiao Data Visualization Platform',
        script: 'build/main.js',
        watch: true,
        'max_memory_restart': '2000M',
        env: {
            COMMON_VARIABLE: 'true'
        },
        'env_production': {
            NODE_ENV: 'production'
        }
    }],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: 'root',
            host: '115.28.187.224',
            ref: 'origin/master',
            repo: 'git@115.28.187.224:big-data/report.git',
            path: '/var/www/production',
            'post-setup': 'git pull && ls -la',
            'post-deploy': 'yarn && yarn run build && pm2 reload ecosystem.config.js --env production'
        }
    }
}