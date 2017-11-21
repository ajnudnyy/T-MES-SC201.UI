// uPLProjectUUID  项目名称 一般为 g_uProjectUUID

var g_uProjectUUID = 1;

const plInfo = [
  {
    Pro: 'Plproject',
    DC_url: 'http://dev.top-link.me/dev/Handler_Plproject_V1.ashx',
    Oplist: [
      {
        Op: '_Add',
        OpName: 'Plproject_Add',
      },
      {
        Op: '_Del',
        OpName: 'Plproject_Del',
      }
    ]
  },
  {
    Pro: 'UIproject',
    DC_url: 'http://dev.top-link.me/dev/Handler_Uiproject_V1.ashx',
    Oplist: [
      {
        Op: '_Add',
        OpName: 'Uiproject_Add',
      },
      {
        Op: '_Del',
        OpName: 'Uiproject_Del',
      }
    ]
  }
]

//函数也可以当成参数传递。
function DoPost(url, func, obj, cb, failcb) {
  var req = new TRequest();
  req.exec(url, func, obj,
  // success:
  function(json) {
    console.log('json===========================', json)
    cb(json); //cb是一个函数，这里调用了这个函数，然后给了参数。
    return;
  },
  // error:
  function(json) {
    console.log('json=====', json)
    failcb(json) });
  return;
}

//ok
//还需要

const getParam = (MeduleInfo) => {
  for(var i = 0; i < plInfo.length; i++){
      if(plInfo[i].Pro == MeduleInfo.modleName){
        let OpItem = {}
        plInfo[i].Oplist.map(function(item){

          if (item.Op == MeduleInfo.op) {
            OpItem = item
            return
          }
        })

        return {
          getDCurl: function(){
            return plInfo[i].DC_url
          },
          getOp: function(){
             return OpItem.OpName
          }
        }
    }
  }
}

function HandleCreateform (url, dat, cb, failcb) {
  DoPost(url, dat, cb, failcb);
}

function HandleCreate(MeduleInfo, dat, cb, failcb) {
  let redat = dat
  redat.uDevModelUUID = '0'
  DoPost(getParam(MeduleInfo).getDCurl(), getParam(MeduleInfo).getOp(), dat, cb, failcb);
}

export {
  plInfo,
  getParam,
  DoPost,
  HandleCreateform,
  HandleCreate
}
