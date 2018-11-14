# emma-tech
Test project for Emma Technologies

Requirements:

Python 3.7+
mySQL 8.0.13



to configure create file config/local.json containing this:
{
    "dbConfig": {
        "user": "<mysql username>",
        "password": "<mysql password>"
    }, 
    "trueLayerConfig": {
        "client": {
            "client_id": "<trueLayer clientId>",
            "client_secret": "<trueLayer secret>"
        }
    }
}
