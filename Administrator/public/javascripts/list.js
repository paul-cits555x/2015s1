var List = function (list_id, dialog_id, url) {
    
    var ajax_gateway = new AjaxGateway(url);
    
    var dialog = new Dialog(dialog_id);
    
    $(list_id + ' ' + 'button[name="add"]').click(function () {
        dialog.resetData();
        dialog.modal(function (result) {
            if (result == 'ok') {
                ajax_gateway.insert(dialog.getData());
            }
        });
    });
    
    $(list_id + ' ' + 'button[name="get"]').click(function () {
        var _id = $(this).val();
        ajax_gateway.get(_id, function (data) {
            dialog.setData(data);
            dialog.modal(function (result) {
                switch (result) {
                    case 'remove':
                        ajax_gateway.remove(_id);
                        break;
                    case 'ok':
                        ajax_gateway.update(_id, dialog.getData());
                        break;
                }
            });
        });
    });

}