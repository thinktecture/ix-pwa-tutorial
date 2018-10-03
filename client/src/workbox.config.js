module.exports = {
    importScripts: ['push.worker.js'],
    importWorkboxFrom: 'local',
    globDirectory: 'build/',
    globPatterns: [
        '**/*.{html,json,js,css,png,woff,woff2,ttf,svg}'
    ],
    swDest: 'build/serviceWorker.js',
};
