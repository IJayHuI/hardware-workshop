const topThree = document.querySelector(".topThree")
const product = document.querySelector(".product")
const getTopDatas = JSON.parse(localStorage.getItem("topDatas"))
const getProductDatas = JSON.parse(localStorage.getItem("productDatas"))

// initialize
for (var i = 0; i < getTopDatas.length; i++) {
	topThree.innerHTML +=
		'<div class="unit"><img class="imgStyle" src="' +
		getTopDatas[i].img +
		'" alt="" /><div class="zIndex2"><a href="' +
		getTopDatas[i].link +
		'" class="text"><h1 style="color: ' +
		getTopDatas[i].fontColor +
		';">' +
		getTopDatas[i].title +
		"</h1><p style='color: " +
		getTopDatas[i].fontColor +
		";'>" +
		getTopDatas[i].content +
		'</p><a class="knowMoreButton" href="' +
		getTopDatas[i].link +
		'">进一步了解</a></a></div></div>'
}

for (var i = 0; i < getProductDatas.length; i++) {
	product.innerHTML +=
		'<div class="unit"><img class="imgStyle" src="' +
		getProductDatas[i].img +
		'" alt="" /><div class="zIndex2"><a href="' +
		getProductDatas[i].link +
		'" class="text"><h1 style="color: ' +
		getProductDatas[i].fontColor +
		';">' +
		getProductDatas[i].title +
		"</h1><p style='color: " +
		getProductDatas[i].fontColor +
		";'>" +
		getProductDatas[i].content +
		'</p><a class="knowMoreButton" href="' +
		getProductDatas[i].link +
		'">进一步了解</a></a></div></div>'
}
