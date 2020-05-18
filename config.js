const environment = {
    //Database access information MySQL
    DB_NAME = 'DATABASE',
    DB_USER = 'user',
    DB_PASSWORD = 'password',
    DB_ADDRESS = '127.0.0.1',
    DB_PORT = '3306',
    //Time to run crawlers
    CRAWLER_HOUR = 09,
    CRAWLER_MIN = 00,
    //Listener port for API
    API_LISTENER_PORT = 3000
}

module.exports = { environment };