var List = function (type) {
    
    var ajax_gateway = new AjaxGateway(type);
            
    var dialog = new Dialog(type);
    
    var id = '#' + type + '-list';
                       
    var load = function () {
        ajax_gateway.get(function (data) {
            var items = [];
            $.each(data, function (i, data) {
                var item = $('<button/>').addClass('list-group-item').attr({
                    type: 'button', 
                    name: 'get', 
                    value: data._id
                });
                var name = data.name;
                if (!name) {
                    name = data.email;
                }
                if (!name) {
                    name = 'null';
                }
                item.text(name);
                item.click(function () {  
                    var _id = $(this).val();
                    ajax_gateway.get(_id, function (data) {
                        dialog.setData(data);
                        dialog.modal(function (result) {
                            switch (result) {
                                case 'remove':
                                    ajax_gateway.remove(_id, load);
                                    break;
                                case 'ok':
                                    ajax_gateway.update(_id, dialog.getData(), load);
                                    break;
                                default:
                                    break;
                            }
                        });
                    });                          
                });
                items.push(item);
            });
            $(id + '-items').empty().append(items);
        });
    }
        
    $(id + ' ' + 'button[name="add"]').click(function () {
        dialog.resetData();
        dialog.modal(function (result) {
            if (result == 'ok') {
                ajax_gateway.insert(dialog.getData(), load);
            }
        });
    });
    
    load();

}