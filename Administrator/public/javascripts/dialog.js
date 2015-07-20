var Dialog = function (type) {
    
    var getArrayName = function (name) {
        var index = name.indexOf("[]");
        if (index <= -1) {
            return null;
        }
        if (index + 2 < name.length) {
            return null;
        }
        return name.substr(0, index);
    }
    
    var id = '#' + type + '-dialog';

    this.getData = function () {
        var data = {}
        $(id + ' input').each(function () {
            var arrayName = getArrayName(this.name);
            if (arrayName) {
                if (!data[arrayName]) {
                    data[arrayName] = [];
                }
                if ($(this).prop("checked")) {
                    data[arrayName].push($(this).val());
                }
            }
            else {
                data[this.name] = $(this).val();
            }
        });
        return data;
    }
    
    var load = function () {
        if (id != '#user-dialog') {
            return;
        }
        ajax_gateway = new AjaxGateway('dojo');
        ajax_gateway.get(function (data) {
            var divs = [];
            $.each(data, function (i, dojo) {
                var div = $('<div/>')
                    .addClass('checkbox');
                var label = $('<label/>');
                label.text(dojo.name);             
                var input = $('<input/>').attr({
                    type: 'checkbox',
                    name: 'dojos[]', 
                    value: dojo._id
                });
                input.css({ left: "20px" });        
                label.append(input);
                div.append(label);
                divs.push(div);
            });
            $(id + '-dojos').empty().append(divs);
        });
    }
    
    this.modal = function (handler) {
        
        var result;
        
        $(id + ' ' + 'button').click(function () {
            result = $(this).val();
        });
        
        $(id).one('hidden.bs.modal', function () {
            handler(result);
        });
        
        load();

        $(id).modal();

    }
    
    this.resetData = function (data) {      
        $(id + ' input').each(function () {
            var arrayName = getArrayName(this.name);
            if (arrayName) {
                $(this).prop("checked", false);
            }
            else {
                $(this).val('');
            }
        });
    }
    
    this.setData = function (data) {
        $(id + ' input').each(function () {
            var arrayName = getArrayName(this.name);
            if (arrayName) {
                var checked = (-1 < $.inArray($(this).val(), data[arrayName]));
                $(this).prop("checked", checked);
            }
            else {
                $(this).val(data[this.name]);
            }            
        });
    }

}