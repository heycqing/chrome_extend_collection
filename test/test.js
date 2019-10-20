var height_dom = document.evaluate('//div[@style="height: 129px;"]', document, null, XPathResult.ANY_TYPE, null)

var height_dom_temp = height_dom.iterateNext()

while(height_dom_temp){
    height_dom_temp.style.display = 'none'
    height_dom_temp = height_dom.iterateNext()
}