# MMM-HS3_device_values
MagicMirror module that display values of HS3 devices


In config.js:

    {
                   module: "MMM-HS3_device_value",
                   position: "top_right",
                   config: {
                       ip: "192.168.123.456",  //ip to HS3 server
                       port: "12345",  //port used by HS3
                       ref: "216",     //reference id to the device
                   }
           },