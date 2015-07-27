function SecurityGateway() {
    
    var that = {};

    that.signIn = function (data, callback) {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                callback(errorThrown, null);
            },
            success: function (data, textStatus, jqXHR) {
                callback(null, data);
            },
            type: 'POST',
            url: '/sign_in'
        });
    }
    
    that.signOut = function (callback) {
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            data: {},
            dataType: 'json',
            error: function (jqXHR, textStatus, errorThrown) {
                callback(errorThrown, null);
            },
            success: function (data, textStatus, jqXHR) {
                callback(null, data);
            },
            type: 'POST',
            url: '/sign_out'
        });
    }
      
    return that;

}
