/* Magic Mirror Module: HS3_device_value
 *
 * By Per Olav Eide Svendsen
 * MIT Licensed.
 *
 * Based on MMM-backlog by Stefan Krause http://yawns.de
 */

Module.register('MMM-HS3_device_value',{

    defaults: {
        units: config.units,
        animationSpeed: 1000,
        updateInterval: 1000 * 3600, //update every hour
        refreshInterval: 1000 * 60 * 10, //refresh every minute     
        timeFormat: config.timeFormat,
        lang: config.language,

        initialLoadDelay: 0, // 0 seconds delay
        retryDelay: 2500,
    },

    // Define required scripts.
    getScripts: function() {
        return ["moment.js"];
    },

    // Define requird styles
    getStyles: function() {
        return ["MMM-HS3_device_value.css"];
    },

    start: function() {
        Log.info('Starting module: ' + this.name);

        this.loaded = false;
        this.sendSocketNotification('CONFIG', this.config);
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        if (!this.loaded) {
            wrapper.innerHTML = this.translate('LOADING');
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        if (!this.data) {
            wrapper.innerHTML = "No data";
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        var t = this.data.Devices[0].status;
        var content = document.createElement("div");
        content.innerHTML = ("<span class=deviceDescription>" + this.config.description + "</span><span class=deviceValue>" + t + "</span>");
        wrapper.appendChild(content);

        return wrapper;
    },

    socketNotificationReceived: function(notification, payload) {
            if (notification === "STARTED") {
                this.updateDom();
            }
            else if (notification === "DATA") {
                this.loaded = true;
                this.processData(JSON.parse(payload));
                this.updateDom();
            }
    },

    /* processData(data)
     * Uses the received data to set the various values.
     *
     * argument data object - tide information received form worldtides.info
     */
    processData: function(data) {

        if (!data) {
            // Did not receive usable new data.
            // Maybe this needs a better check?
            return;
        }

        this.data = data;

        this.loaded = true;
        this.updateDom(this.config.animationSpeed);
    }

});