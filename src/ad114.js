(function () {
    function stopAD(){
        // 针对 114中文阅读网的
        // var adNode = document.getElementsByClassName('afd-ad')
        var adNode = document.getElementById('_qlt4qo12rut')
        var adBottomNode = document.getElementById('cZ115713822152679')
        var ad_3 = document.getElementsByClassName('mb10')
        for (var i = 0; i < adNode.length; i++) {
            adNode[i].style.display = 'none';
        }
        for (var j = 0; j < adBottomNode.length; j++) {
            adBottomNode[j].style.display = 'none'
        }
        for (var k = 0; k < ad_3.length; k++) {
            bottomOperateTop[k].style.display = 'none'
        }
    }

    window.addEventListener('onload', function(e){
        stopAD()
    })

    // 监听页面高度变化
    window.addEventListener('scroll', function (e) {
        stopAD()        
    })

    stopAD()

})()