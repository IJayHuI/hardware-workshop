const site = window.location.search
const currentPageType = site.match(/type=([^ ])/)[0].split("=")[1]
const currentPageModel = site.match(/model=([^ ]+)/g)[0].split("=")[1]

const getCommodityDatas = JSON.parse(localStorage.getItem("commodities"))
const title = document.querySelector(".title")
const price = document.querySelector(".price span")
const currentImg = document.querySelector(".imgStyle")
const imgList = document.querySelector(".imgList")
let listImgs = document.querySelectorAll(".listImg")

let currentPageContent = getCommodityDatas[currentPageType]
const description = document.querySelector(".description")
// initialize
for (let i = 0; i < currentPageContent.length; i++) {
	if (currentPageContent[i].model == currentPageModel) {
		title.innerText = currentPageContent[i].title
		price.innerText = currentPageContent[i].price
		currentImg.src = currentPageContent[i].img
		for (let j = 0; j < currentPageContent[i].informationImgs.length; j++) {
			imgList.innerHTML += '<img class="listImg" src="' + currentPageContent[i].informationImgs[j] + '" alt="" />'
		}
		listImgs = document.querySelectorAll(".listImg")
		listImgs[0].classList.add("currentChoose")
		// 商品图文详情
		for (let j = 0; j < currentPageContent[i].description.length; j++) {
			description.innerHTML += '<img alt="" class="descriptionImg" src="' + currentPageContent[i].description[j] + '" />'
		}
		break
	}
}
// 选择图片事件
for (let i = 0; i < listImgs.length; i++) {
	listImgs[i].addEventListener("click", () => {
		currentImg.style.opacity = 0
		setTimeout(() => {
			currentImg.src = listImgs[i].src
			currentImg.style.opacity = 1
		}, 300)
		for (let j = 0; j < listImgs.length; j++) listImgs[j].classList.remove("currentChoose")
		listImgs[i].classList.add("currentChoose")
	})
}

// 添加到购物车事件
const addToCart = () => {
	if (checkLogInStatus()) {
		const commodityAddToCart = [currentPageType, currentPageModel, 1]
		let userCart = users[userID][3]
		// 从 localStorage 获取当前的购物车数据
		if (userCart.length == 0) {
			// 购物车为空，直接添加商品
			userCart.push(commodityAddToCart)
		} else {
			// 购物车不为空，检查是否已经存在相同商品
			let itemExists = false
			for (let i = 0; i < userCart.length; i++) {
				if (userCart[i][0] === currentPageType && userCart[i][1] === currentPageModel) {
					// 找到相同的商品，增加数量
					userCart[i][2] += 1
					itemExists = true
					break
				}
			}
			// 购物车中不存在相同商品，添加新商品
			if (!itemExists) userCart.push(commodityAddToCart)
		}
		localStorage.setItem("users", JSON.stringify(users))
		alert("成功添加到购物车")
	} else {
		let toLogIn = window.confirm("您还未登录，是否前往登录？")
		if (toLogIn) window.location.href = "/pages/login.html"
		else alert("添加失败")
	}
}
