const site = window.location.search
const maxTitle = document.querySelector(".maxTitle")
const title = document.querySelector(".title span")
const typeList = ["CPU", "主板", "内存", "显卡", "电源", "机箱", "散热器", "硬盘", "配件"]
const currentPage = site.match(/type=([^ ]+)/g)[0].split("=")[1]
const commoditiesContainer = document.querySelector(".commodities")
const commoditiesDatas = JSON.parse(localStorage.getItem("commodities"))

maxTitle.innerText = typeList[currentPage]
title.innerText = typeList[currentPage]
document.title += typeList[currentPage]

let currentPageContent = commoditiesDatas[currentPage]
for (let i = 0; i < currentPageContent.length; i++) {
	commoditiesContainer.innerHTML +=
		'<a class="commodity" href="' +
		currentPageContent[i].link +
		'"><img class="imgStyle" src="' +
		currentPageContent[i].img +
		'" /><div class="commodityInfo"><h3 class="commodityTitle">' +
		currentPageContent[i].title +
		'</h3><p class="commodityPrice">¥ <span>' +
		currentPageContent[i].price +
		"</span></p></div></a>"
}
