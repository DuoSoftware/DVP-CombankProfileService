module.exports = {
    "DB": {
        "Type":"postgres",
        "User":"duo",
        "Password":"DuoS123",
        "Port":5432,
        "Host":"104.236.231.11",//104.131.105.222
        "Database":"duo"
    },
    "Redis":
    {
        "ip": "45.55.142.207",
        "port": 6389,
        "password":"DuoS123"

    },
    "Security":
    {
        "ip" : "45.55.142.207",
        "port": 6389,
        "user": "duo",
        "password": "DuoS123"
    },
    "Host": {
        "domain": "0.0.0.0",
        "port": 8827,
        "version": "1.0.0.0",
        "hostpath": "./config",
        "logfilepath": ""
    },
    "DBTWO": {
        "Protocol": "TCPIP",
        "User": "waruna",
        "Password": "DuoR123",
        "Port": "50000",
        "Host": "localhost",
        "Database": "sample",
        "ProfileSp": "CALL GETPROFILE('%s')",
        "ImportantDataSp": "CALL GETPROFILEIMPORTANT('%s')"
    },
};