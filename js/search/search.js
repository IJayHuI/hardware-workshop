const site = window.location.search
const searchContent = decodeURIComponent(site.match(/search=([^ ]+)/g)[0].split("=")[1])
const maxTitle = document.querySelector(".title")
const title = document.querySelector(".title span")
const getCommodities = JSON.parse(localStorage.getItem("commodities"))
const commoditiesContainer = document.querySelector(".commodities")
const results = []

// initialize
title.innerText = "“" + searchContent + "”"
for (let i = 0; i < getCommodities.length; i++) {
	for (let j = 0; j < getCommodities[i].length; j++) {
		if (getCommodities[i][j].title.toLowerCase().includes(searchContent)) results.push(getCommodities[i][j])
	}
}

// 显示商品
if (results.length != 0) {
	for (const result of results) {
		commoditiesContainer.innerHTML +=
			'<a class="commodity" href="' +
			result.link +
			'"><img class="imgStyle" src="' +
			result.img +
			'" /><div class="commodityInfo"><h3 class="commodityTitle">' +
			result.title +
			'</h3><p class="commodityPrice">¥ <span>' +
			result.price +
			"</span></p></div></a>"
	}
} else {
	const container = document.querySelector(".middle .container")
	container.classList.add("noResult")
	maxTitle.innerHTML = "找不到关于<span>“" + searchContent + "”</span>的商品"
}
