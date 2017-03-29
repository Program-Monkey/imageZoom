(function(window){
  function imageZoom(elem,options){

    var settings = {
      imgZoom : options && options.imgZoom || 2,
      marginLeft: options && options.marginLeft || 0,
      marginTop: options && options.marginTop || 0,
    }

    // 获取图片节点
    var imgContainer = elem;

    // 获取图片url
    var imgUrl = imgContainer.getAttribute('data-src')
    var originalUrl = imgUrl.replace(/\.(jpg|jpeg|png|gif)(_)(\d+)(x)(\d+)(q90)?/g,'');

    // 获取图片节点位置
    var elemClientRect = imgContainer.getBoundingClientRect();

    // 生成小图html
    var minImgHtml = '<img style="width:100%;height:100%" src="' + imgUrl + '" />';

    if(!settings.marginLeft && !settings.marginTop){
      settings.marginLeft = elemClientRect.width+10;
    }

    // 生成遮罩html
    var glassWidth = elemClientRect.width/settings.imgZoom;
    var glassHeight = elemClientRect.height/settings.imgZoom;
    var glassStyle = 'width:' + glassWidth + 'px;height:' + glassHeight + 'px;'+'      position:absolute;top: -9999px;left: -9999px;cursor: move;background: rgba(0,0,180,0.5);'
    var glassHtml = '<div class="J_glass" style="' + glassStyle + '" ></div>';

    // 生成大图
    var maxImgStyle = 'position:absolute;width:' + (elemClientRect.width * settings.imgZoom) + 'px;height:' + (elemClientRect.height * settings.imgZoom) + 'px;';
    var maxImgHtml = '<img class="J_maxImg" src="' + originalUrl + '" style="' + maxImgStyle + '" />';

    // 生成大图容器
    var maxContainerStyle = 'position:absolute;left:' + settings.marginLeft + 'px;top:'+ settings.marginTop +'px;width:' + elemClientRect.width + ';height:' + elemClientRect.height + ';overflow:hidden;display:none';
    var maxContainerHtml = '<div class="J_imgMax" style="' + maxContainerStyle + '">' + maxImgHtml + '</div>';

    var contentHtml = minImgHtml + glassHtml + maxContainerHtml;

    imgContainer.innerHTML = contentHtml;

    var maxImgContainer = imgContainer.querySelector('.J_imgMax');
    var glassBlock = imgContainer.querySelector('.J_glass');
    var maxImg = imgContainer.querySelector('.J_maxImg');

    // 隐藏大图&遮罩
    var hideMaxImg = function(){
        glassBlock.style.top = '-9999px';
        glassBlock.style.left = '-9999px';
        maxImgContainer.style.display = 'none';
    }

    imgContainer.onmouseover = function(event){
      event.stopPropagation();
      maxImgContainer.style.display = 'block';
    };

    imgContainer.onmouseout = function(event){
      event.stopPropagation();
      hideMaxImg();
    };

    imgContainer.onmousemove = function(event) {
      event.stopPropagation();
      var clientRect = event.currentTarget.getBoundingClientRect();
      // 获取左右上下坐标
      var leftX = event.clientX - clientRect.left;
      var leftY = event.clientY - clientRect.top;
      // 动态设置遮罩范围值
      var pointerLeft = leftX - glassWidth/2;
      var pointerTop = leftY - glassHeight/2;
      if((pointerLeft+glassWidth/2) > clientRect.width || pointerLeft < 0 - glassWidth/2 || (pointerTop+glassHeight/2) > clientRect.height || pointerTop < 0 - glassHeight/2){
        hideMaxImg();
        return !1;
      };
      if(pointerLeft < 0){
        pointerLeft = 0;
      };
      if(pointerLeft > clientRect.width - glassWidth){
        pointerLeft = clientRect.width - glassWidth;
      };
      if(pointerTop < 0){
        pointerTop = 0;
      };
      if(pointerTop > clientRect.height - glassHeight){
        pointerTop = clientRect.height - glassHeight;
      };
      glassBlock.style.left = pointerLeft;
      glassBlock.style.top = pointerTop;
      var percentLeft = pointerLeft/clientRect.width;
      var percentHeight = pointerTop/clientRect.height;
      maxImg.style.left = -(percentLeft*maxImg.clientWidth)+'px';
      maxImg.style.top = -(percentHeight*maxImg.clientHeight)+'px';
    };
  }
  window.imageZoom = imageZoom;
})(window)

console.log(window)
