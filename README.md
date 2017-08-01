# imageZoom
javascript image zoom

how to use 


# css
`
    .imgBox{
      width: 200px || your width;
      height: 200px || your height;
      position: relative;
    }
`

# html
`
    <div class="J_imgBox imgBox" data-src="your image url"></div>
`

# js
`
  var elem = document.querySelector('.J_imgBox'); // or which element your want

  imageZoom(elem,{
    imgZoom:2,
    marginLeft: 0,
    marginTop: 0
  });
`

**In imageZoom.js , you need to write your own RegExp to replace my RegExp . This is important**


Article Url: http://www.cnblogs.com/ys-ys/p/6642304.html
