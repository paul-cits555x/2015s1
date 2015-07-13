var AjaxGateway = function (listUrl, baseUrl) {
    
    var error = function (jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
    }
    
    this.insert = function (data) {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            error: error,
            success: success,
            type: 'POST',
            url: listUrl
        });
    }
    
    this.remove = function (id) {
        $.ajax({
            dataType: 'json',
            error: error,
            success: success,
            type: 'DELETE',
            url: listUrl + id
        });
    }
    
    var success = function (data, textStatus, jqXHR) {
        window.location.replace(baseUrl);
    }
    
    this.update = function (id, data) {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            error: error,
            success: success,
            type: 'PUT',
            url: listUrl + id
        });
    }

}
