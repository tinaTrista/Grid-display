var EventUtil = {
    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};


window.onload = function() {
  // handle resource
  var pro = document.getElementsByClassName('os-surport')
  for (var i = 0; i < pro.length; i++) {
    EventUtil.addHandler(pro[i], "click", function(ev){
        var ev = ev || window.event
        var target = ev.target || ev.srcElement
        var parent = target.parentNode
        if (ev.target.className === 'icon-trash') {
          //del resource
          parent.parentNode.removeChild(parent)
        } else if (ev.target.className === 'icon-plus') {
          // add resource box
          msgBox(parent, 'msgBox', 200, 100);
        }
    })
  }
  // handle user-info show
  var user = document.getElementById('user');
  EventUtil.addHandler(user, 'click', function () {
    var userInfo = document.getElementById('user-info');
    if (userInfo.style.display === 'block') {
      userInfo.style.display = 'none'
      document.getElementById('user-angle').style.visibility = 'hidden'
    } else {
      userInfo.style.display = 'block'
      document.getElementById('user-angle').style.visibility = 'visible'
    }
  })

  // handle menu show
  var menuIcon = document.getElementById('menu-icon');
  menuIcon.onclick = function() {
    document.getElementById('left').style.display = 'block';
  }
  var left = document.getElementById('left');
  left.onclick = function(ev) {
    if (ev.target.className === 'icon-close') {
      document.getElementById('left').style.display = 'none';
    }
  }
}

function addResource(obj, content) {
  if (!content)
    return;
  var temp = document.createElement('span')
  temp.className = "surport"
  temp.innerHTML = content + "<span class='icon-trash'></span>"
  obj.appendChild(temp)
}

function msgBox(obj, id) {
  var left = obj.offsetLeft
  var top = obj.offsetTop + 40

  if (document.getElementById(id) == null) {

    var msgBox = null;
    var className = 'box bottom';

    var html = "<div class='arrow'></div><div><p class='title'>separate multiple resource name with commas</p>" +
     "<div class='close'><span class='icon-close'></span></div>" +
     "<div><input id='resource' type='text' placeholder='e.g. Chrome, Firefox'/></div>" +
     "<div class='buttons'><input id='add-button' type='button' value='Add Resource'/><input id='cancel-button' type='button' value='Cancel'/></div>"
    "</div>";
    msgBox = document.createElement('div');
    msgBox.className = className;
    msgBox.id = id;
    msgBox.innerHTML = html;
    obj.appendChild(msgBox)
    msgBox.style.left = (left - 20) + 'px'
    msgBox.style.top = top + 'px'
    msgBox.style.position = 'absolute'

    msgBox.onclick = function(ev) {
      var resource = document.getElementById('resource')
      if (ev.target.id === 'add-button') {
        //添加资源
        //是否要判断input 是否为空
        var resourceArray = resource.value.split(',')
        for (var i = 0; i < resourceArray.length; i++) {
          addResource(obj, resourceArray[i]);
        }
        resource.value = ''
        document.getElementById(id).style.display = "none"
      } else if (ev.target.id === 'cancel-button' || ev.target.className === 'icon-close') {
        // 取消添加
        resource.value = ''
        document.getElementById(id).style.display = "none"
      }
    }
  } else {
    var msgBox = document.getElementById(id)
    msgBox.style.display = 'block'
    msgBox.style.left = (left - 20) + 'px'
    msgBox.style.top = top + 'px'
  }
}
