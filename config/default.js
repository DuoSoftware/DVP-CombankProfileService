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
        "password":"DuoS123",
        "sentinels":{
            "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
            "port":16389,
            "name":"redis-cluster"
        }

    },
    "Security": {
        "ip": "45.55.142.207",
        "port": 6389,
        "user": "duo",
        "password": "DuoS123",
        "mode": "sentinel",//instance, cluster, sentinel
        "sentinels": {
            "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
            "port": 16389,
            "name": "redis-cluster"
        }
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
        "ProfileSearchSp": "CALL PROFILESEARCH('%s','%s')",
        "ImportantDataSp": "CALL GETPROFILE('%s')"
    },
    "active_db" : "db_two" //db_two ,mongo
};