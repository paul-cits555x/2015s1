var DataGateway = function (type) {
    
    var error = function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
    }
    
    this.get = function () {
        var callback = arguments[arguments.length - 1];
        switch (arguments.length) {         
            case 1:
                $.ajax({
                    dataType: 'json',
                    error: error,
                    success: function (data, textStatus, jqXHR) {
                        callback(data);
                    },
                    type: 'GET',
                    url: url
                });
                break;
            case 2:
                _id = arguments[0];
                $.ajax({
                    dataType: 'json',
                    error: error,
                    success: function (data, textStatus, jqXHR) {
                        callback(data);
                    },
                    type: 'GET',
                    url: url + _id
                });
                break;
            default:
                break;
        }
    }
     
    this.insert = function (data, callback) {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            error: error,
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            type: 'POST',
            url: url
        });
    }
    
    this.remove = function (id, callback) {
        $.ajax({
            dataType: 'json',
            error: error,
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            type: 'DELETE',
            url: url + id
        });
    }
        
    this.update = function (id, data, callback) {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            error: error,
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            type: 'PUT',
            url: url + id
        });
    }

    var url = '/' + type + 's/';

}
