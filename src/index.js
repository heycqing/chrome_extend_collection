(function(){
    var adNode = document.getElementsByClassName('afd-ad')
    var adBottomNode = document.getElementsByClassName('banner')
    var bottomOperateTop = document.getElementsByClassName('bottomOperateTop')
    for(var i = 0; i < adNode.length; i++){
        adNode[i].style.display = 'none';
    }
    for(var j = 0; j < adBottomNode.length; j++){
        adBottomNode[j].style.display = 'none'
    }
    for(var k = 0; k < bottomOperateTop.length; k++){
        bottomOperateTop[k].style.display = 'none'
    }
})()

// 解决当前页面的上的广告

// 除了手动点击之外还有其他方法吗？
// 还有一个问题就是，当加载下一页的时候，如何判断并且实时跟进去去除AD
// method:
// 1.通过监控滑动的高度，
// 2.监控页面的更新

window.addEventListener("beforeunload", function(event) { 
    alert('123')
    event.returnValue = "我在这写点东西..."; 
}); 
