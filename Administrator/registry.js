var Registry = function () {
    
    var database = null;
    
    this.getCollection = function(name) {
        return database.collection(name);
    }

    this.getDatabase = function() {
        return database;
    }

    this.setDatabase = function(value) {
        database = value
    }
    
    if (Registry.caller != Registry.getInstance) {
        throw new Error('')
    }
}

Registry.instance = null;

Registry.getInstance = function() {
    if (this.instance == null) {
        this.instance = new Registry();
    }
    return this.instance;
}

module.exports = Registry.getInstance();
