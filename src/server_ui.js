//认真仔细的核对每一项。
var g_ui_ProjectUUID=0;


function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function DoPost(url,func,obj,cb){

      var req = new TRequest();

      console.log(func);
      // exec : function (url, op, obj, cb, err)
      req.exec(url, func, obj,
          // success:
          function (json){

             cb(json);            //cb是一个函数，这里调用了这个函数，然后给了参数。

             return ;
          },
          // error:

          function (json) {

          });

      return ;

}

   // function DoPost_Folder(func,obj,cb)
   // {
   //   var url = "http://localhost:52491/dev/Handler_Plproject_Folder_V1.ashx";
   //   return DoPost(url ,func,obj,cb);
   // }

   //访问本地的数据
   // var url = "http://dev.top-link.me/dev/Handler_Uiproject_File_V1.ashx";
   // var url = "http://dev.top-link.me/dev/Handler_Uiproject_V1.ashx";
   // ? id =

///////////////////////联合调试的时候用到的//////////////////////////////////////////////////////////
function Dopost_project_first()
{
  var url = "http://localhost:52491/dev/Handler_Uiproject_V1.ashx?id=";
  return DoPost(url,func,obj,cb);
}

function Uiproject_GetFileStruct_first()
{
    var obj = {
        //uProjectUUID : pro_uuid ,    // 工程UUID
    };

    Dopost_project_first("Uiproject_GetFileStruct",obj,function(res){

        display_file_struct(res.obj);

    });

}





function DoPost_File(func,obj,cb)
{
  var url = "http://localhost:52491/dev/Handler_Uiproject_File_V1.ashx";
  return DoPost(url,func,obj,cb);
}

function DoPost_Project(func,obj,cb)
{
  var url = "http://localhost:52491/dev/Handler_Uiproject_V1.ashx";
  return DoPost(url,func,obj,cb);
}


function Uiproject_Add(name,desc)
{
    var obj = {

        uDevModelUUID : 0 ,     // 智能硬件原型UUID
        strProjectName : "p2" ,  // UI工程名称
        strProjectDesc : "ui_proj_2_desc"   // UI工程描述

    };

    //输入值与默认值进行替换。

    console.log(obj);

    DoPost_Project("Uiproject_Add",obj,function(res){
        console.log(res);
    });
}

function Uiproject_ReName(pro_uuid,name)
{
    var obj = {
    uProjectUUID : 0 ,    // 工程UUID
    strProjectName : ""  // UI工程名称
    };
    //输入值与默认值进行替换。
    console.log(obj);

    DoPost_Project("Uiproject_ReName",obj);
}

function Uiproject_Del(pro_uuid)
{
    var obj = {
        uProjectUUID : 0||pro_uuid ,    // 工程UUID
    };

    console.log(obj);

    DoPost_Project("Uiproject_Del",obj);

}

//将所有的project显示出来
function Uiproject_List()
{
    var obj = {
        //uProjectUUID : 0 ,    // 工程UUID
    };

    console.log(obj);

    DoPost_Project("Uiproject_List",obj,function(res){
        console.log(res.obj);
        //将收到的数据显示出来。用模态框进行选择。
        //console.log();
        display_project_list(res.obj);

    });
}

function Uiproject_Details(pro_uuid)
{
    var obj = {
        uProjectUUID : 0||pro_uuid,    // 工程UUID
    };

    console.log(obj);

    DoPost_Project("Uiproject_Details",obj);
}


function Uiproject_GetFileStruct(pro_uuid)
{
    var obj = {
        uProjectUUID : pro_uuid ,    // 工程UUID
    };

    console.log(obj);

    DoPost_Project("Uiproject_GetFileStruct",obj,function(res){
        // console.log(res);
        //将收到全部项目显示出来。
        display_file_struct(res.obj);

    });
}


//////////////////////////////////////
//后台要返回file_uuid.
//myModalSavefunc
function Uiproject_File_Add(pro_uuid,name,name_ext)
{
    var obj = {
    uProjectUUID : pro_uuid ,    // 工程UUID
    strFileName : name , // 文件名
    strFileExt : name_ext   // 文件扩展名
        };

    console.log(obj);

    DoPost_File("Uiproject_File_Add",obj,function(res){

        Uiproject_GetFileStruct(pro_uuid);

    });
}

function Uiproject_File_Save(pro_uuid,file_uuid,content)
{
    var obj = {
    uProjectUUID : pro_uuid ,    // 工程UUID
    uFileUUID : file_uuid , // 文件UUID
    strFileContent : content   // 文件内容
        };

    console.log(obj);

    DoPost_File("Uiproject_File_Save",obj,function(res){
        console.log(res);
    });
}

function Uiproject_File_Del(pro_uuid,file_uuid)
{
    var obj = {
    uProjectUUID : 0 ,    // 工程UUID
    uFileUUID : 0  // 文件UUID
        };

    console.log(obj);

    DoPost_File("Uiproject_File_Del",obj,function(json){
        console.log(json);
    });

}

function Uiproject_File_List(pro_uuid)
{
    var obj = {
            uProjectUUID : pro_uuid     // 工程UUID
        };


    DoPost_File("Uiproject_File_List",obj,function(res){
        console.log(res);

    });

}

function Uiproject_File_Details(pro_uuid,file_uuid)
{
    var obj = {
        uProjectUUID : 0||pro_uuid ,    // 工程UUID
        uFileUUID : 0||file_uuid  // 文件UUID
        };

    console.log(obj);

    DoPost_File("Uiproject_File_Details",obj,function(json){
        console.log(json);
    });

}

function Uiproject_File_ReName(pro_uuid,file_uuid,file_name,file_ext)
{
    var obj = {
        uProjectUUID : 0 ,    // 工程UUID
        uFileUUID : 0 ,     // 文件UUID
        strFileName : "" , // 文件名
        strFileExt : ""   // 文件扩展名
        };

    console.log(obj);

    DoPost_File("Uiproject_File_ReName",obj,function(json){
        console.log(json);
    });

}

// ui接口列表。

function UiProject_InterfaceList()
{
    var obj = {
    };

    console.log(obj);

    DoPost_Project("UiProject_InterfaceList",obj,function(json){
        console.log(json);
    });

}

/////////////////////////////////////////////////////

///////////////////////////////////////index call function///////////////////////////////////////////////////

///////////////////////////////////////////////////////ui-project
function creat_new_ui_project(){

    Uiproject_Add(2,"p2","ui_proj_2_desc");

}

function rename_ui_project(){
    Uiproject_ReName(2,"newname");
}

function del_ui_project(){
    Uiproject_Del(2);
}

function list_ui_project(){
    Uiproject_List();
}

function get_ui_project_detail(){
    Uiproject_Details(2);
}

function get_ui_projectd_file_struct(pro_uuid){
    Uiproject_GetFileStruct(2);
}

///////////////////////////////////////////////////////ui-file

function creat_new_ui_File(pro_uuid,file_name,file_ext){

    // Uiproject_File_Add(2,"f2","dat");
    Uiproject_File_Add(pro_uuid,file_name,file_ext);
}

//g_pro_uuid  全局变量在这里能不能访问。

//
function save_ui_file(){

    //var pro_uuid,file_uuid,content;

    var pro_uuid=g_ui_ProjectUUID;
    var file_uuid=active_file_id.replace(/[^0-9]/ig,"");
    var content=iframe_get_str();


    Uiproject_File_Save(pro_uuid,file_uuid,content);

}

function save_all_ui_file(){

    $.each(svg_editor,function(index,item){

        var pro_uuid=g_ui_ProjectUUID;
        var file_uuid=item.id.replace(/[^0-9]/ig,"");
        var content=item.svg_content;

        Uiproject_File_Save(pro_uuid,file_uuid,content)
    });

}

function del_ui_file(pro_uuid,file_uuid){
    Uiproject_File_Del(pro_uuid,file_uuid);
}

function inquire_ui_file_list(pro_uuid){
    Uiproject_File_List(pro_uuid);
}

function get_ui_file_detail(){
    Uiproject_File_Details(pro_uuid,file_uuid);
}

function rename_ui_file(pro_uuid,file_uuid,file_name,file_ext){
    Uiproject_File_ReName();
}

///////////////////////////////////////////////////////////////////////////////////////

var active_file_id;


function display_file_struct(files){

    $.each(files,function(index,item){

        var inner=document.createElement("li");
        inner.setAttribute("id","navi"+item.uUIProjectFileUUID);
        inner.setAttribute("style","text-align:center;width:160px;height:110px;border:1px solid grey;line-height: 150px;margin:10px;background-color:#fff;");
        inner.innerHTML=item.strUIProjectFileName+item.strUIProjectFileExt;          //可以换成item中的具体的某个值

        document.getElementById("navi-container").appendChild(inner);

        creat_contextmenu_by_id("navi"+item.uUIProjectFileUUID);

        // console.log(item);

        if(index==0)
        {

            active_file_id="navi"+item.uUIProjectFileUUID;

            $('#'+active_file_id).css("background-color","lightgrey");

        }

        //svg_editor
        var v_svg_content= {};

        v_svg_content.id = "navi"+item.uUIProjectFileUUID;

        v_svg_content.svg_content = item.strUIProjectFileContent;

        svg_editor.push(v_svg_content);

    });


}

//功能没有实现一定是你的代码没有写好。

function remove_all_Child(target_node)
{
    // var div = document.getElementById("div1");

    while(target_node.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        target_node.removeChild(target_node.firstChild);
    }

}


function display_project_list(projects){

        // uUIProjectUUID: "6", uUserUUID: "1", strUIProjectName: "p2", strUIProjectDescription: "ui_proj_2_desc", strUIProjectNote: "",
        //清除上一次请求的数据

        var list_node=document.getElementById("Project_list_select");
        remove_all_Child(list_node);

        $.each(projects,function(index,item){

            var options=document.createElement("option");
            options.setAttribute("id",item.uUIProjectUUID);
            options.innerHTML="工程名称："+item.strUIProjectName+"(id"+item.uUIProjectUUID+")";

            list_node.appendChild(options);

        });

        $('#myModalProject_list').modal();

}
