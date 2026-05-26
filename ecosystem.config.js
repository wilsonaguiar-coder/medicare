module.exports = {
  apps: [
    {
      name: 'medicare-api',
      cwd: '/opt/medicare/apps/api',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: { NODE_ENV: 'production' },
    },
    {
      name: 'medicare-web',
      cwd: '/opt/medicare/apps/web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      instances: 1,
      autorestart: true,
      watch: false,
      env: { NODE_ENV: 'production' },
    },
  ],
}
