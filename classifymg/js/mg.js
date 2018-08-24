var mg=null;
$(function () {
    
    mg = $("#classmg").ligerGrid({
        columns: [
            { display: '主键', name: 'CustomerID', align: 'left', width: 120 },
            { display: '公司名', name: 'CompanyName', minWidth: 60 },
            { display: '联系名', name: 'ContactName', width: 50, align: 'left' }, { display: '联系名', name: 'ContactName', minWidth: 140 }, { display: '联系名', name: 'ContactName', minWidth: 140 }, { display: '联系名', name: 'ContactName', minWidth: 140 }, { display: '联系名', name: 'ContactName', minWidth: 140 },
            { display: '城市', name: 'City' }
        ], dataAction: 'server', pageSize: 30,
        data: CustomersData, sortName: 'CustomerID',
        width: '100%', height: '100%',allowUnSelectRow:true,
        onSelectRow: function (data, rowindex, rowobj)
        {
            $.ligerDialog.alert('1选择的是' + data.CustomerID);
        },
        onUnSelectRow: function (data, rowindex, rowobj)
        {
            alert('反选择的是' + data.CustomerID);
        }
    });

    mg.bind('selectRow', function (data)
    {
        $.ligerDialog.alert('2选择的是' + data.CustomerID);
    });
});