(function () {
    function stopAD(){
        // 针对 114中文阅读网的
        var tempBody = document.getElementsByTagName('body')[0]
        // 顶部的广告
        var adTopNode = document.getElementById('content')
        var adTop_node1 = adTopNode.firstElementChild.nextElementSibling
        var adTop_node2 = adTop_node1.nextElementSibling.nextElementSibling

        // 底部的广告
        var adBottomNode = document.getElementsByClassName('mb10')
        // 悬浮的广告
        // 记得 script 标签在最后面
        var node1 = tempBody.lastElementChild
        var node2 = node1.previousElementSibling
        
      

        for(var i = 0; i < adBottomNode.length; i++){
            adBottomNode[i].style.display = 'none'
        }

        if(node1 != null && node2 != null){
            tempBody.removeChild(node1)
            tempBody.removeChild(node2)
        }

        if(adTop_node1 != null && adTop_node2 != null){
            adTopNode.removeChild(adTop_node1)
            adTopNode.removeChild(adTop_node2)
        } 


    }

    window.addEventListener('onload', function(e){
        stopAD()
    })

    stopAD()

})()

  // var adFloat_a_Node = document.evaluate("//a[@style='background-color: rgba(255, 255, 255, 0) !important; height: 237px;']",document, null, XPathResult.ANY_TYPE, null )

        // var just_adFloatNode = adFloatNode.iterateNext()
        // var just_adFloat_a_Node = adFloat_a_Node.iterateNext()
        // var just_adFloat_other_Node = adFloat_other_Node.iterateNext()