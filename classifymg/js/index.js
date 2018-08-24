$(function () {
    var manager=null;
    var treedata=[];
    var grid=null;

    manager = $("#classtree").ligerTree({
        data:treedata,
        idFieldName :'id',
        textFieldName: 'name',
        slide : false,
        parentIDFieldName :'parentId',
        checkbox:false,
        parentIcon: null,
        childIcon: null,
        nodeWidth:312,
        isExpand:2,
        onclick:function(node){
            console.log(node);
            //nodeinfo.val(node.data.name);
        }
    });
    function addRoot() {
        $('#addroolclass').modal('show');
    }
});