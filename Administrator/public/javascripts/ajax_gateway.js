var AjaxGateway = function (url) {
    
    var error = function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
    }
    
    this.get = function (id, callback) {
        $.ajax({
            dataType: 'json',
            error: error,
            success: function (data, textStatus, jqXHR) {
                callback(data);
            },
            type: 'GET',
            url: url + id
        });
    }
     
    this.insert = function (data) {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            error: error,
            success: success,
            type: 'POST',
            url: url
        });
    }
    
    this.remove = function (id) {
        $.ajax({
            dataType: 'json',
            error: error,
            success: success,
            type: 'DELETE',
            url: url + id
        });
    }
    
    var success = function (data, textStatus, jqXHR) {
    }
    
    this.update = function (id, data) {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            error: error,
            success: success,
            type: 'PUT',
            url: url + id
        });
    }

}
