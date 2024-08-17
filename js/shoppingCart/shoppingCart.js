const title = document.querySelector(".title")
const commoditiesContainer = document.querySelector(".commodities")
const middleContainer = document.querySelector(".middle .container")
const allPrice = document.querySelector(".title span")

// 加载数据
const loadData = () => {
	const allCommodities = JSON.parse(localStorage.getItem("commodities"))
	const userCart = users[userID][3]
	let idNumber = 0
	commoditiesContainer.innerHTML = ""
	userCart.forEach((item) => {
		const [type, model, quantity] = item
		for (let i = 0; i < allCommodities[type].length; i++) {
			if (allCommodities[type][i].model == model) {
				commoditiesContainer.innerHTML +=
					'<div class="commodity" id="' +
					idNumber +
					'"><div class="commodityImg"><img class="imgStyle" src="' +
					allCommodities[type][i].img +
					'" alt="" /></div><div class="commodityInfo"><div class="commodityTitle">' +
					allCommodities[type][i].title +
					'</div><div class="singlePrice">单价：<span id="' +
					idNumber +
					'">' +
					allCommodities[type][i].price +
					'</span></div><div class="sumPrice">总价：<span id="' +
					idNumber +
					'">' +
					allCommodities[type][i].price * quantity +
					'</span></div></div><div class="commodityOperat"><button onclick="substract(this.id)" class="add" id="' +
					idNumber +
					'">-</button><input class="quantity" readonly type="text" value="' +
					quantity +
					'"/><button onclick="add(this.id)" class="substract" id="' +
					idNumber +
					'">+</button><button id="' +
					idNumber +
					'" onclick="deleteItem(this.id)" class="delete">删除</button></div></div>'
			}
		}
		idNumber++
	})
}

// 计算总价
const sumAllPrice = () => {
	const allCommodityPrice = document.querySelectorAll(".sumPrice span")
	if (allCommodityPrice.length != 0) {
		let a = 0
		for (let i = 0; i < allCommodityPrice.length; i++) a += parseInt(allCommodityPrice[i].textContent)
		allPrice.innerText = a
	} else {
		middleContainer.classList.add("noLogin")
		commoditiesContainer.style.display = "none"
		title.innerText = "您的购物车是空的哦"
	}
}

// 商品数量减
const substract = (id) => {
	const allCommodityPrice = document.querySelectorAll(".sumPrice span")
	const allSinglePrice = document.querySelectorAll(".singlePrice span")
	const quantity = document.querySelectorAll(".quantity")
	if (quantity[id].value != 1) quantity[id].value--
	allCommodityPrice[id].textContent = quantity[id].value * allSinglePrice[id].textContent
	sumAllPrice()
	users[userID][3][id][2] = quantity[id].value
	localStorage.setItem("users", JSON.stringify(users))
}

// 商品数量加
const add = (id) => {
	const allCommodityPrice = document.querySelectorAll(".sumPrice span")
	const allSinglePrice = document.querySelectorAll(".singlePrice span")
	const quantity = document.querySelectorAll(".quantity")
	quantity[id].value++
	allCommodityPrice[id].textContent = quantity[id].value * allSinglePrice[id].textContent
	sumAllPrice()
	users[userID][3][id][2] = quantity[id].value
	localStorage.setItem("users", JSON.stringify(users))
}

// 删除商品
const deleteItem = (id) => {
	let confirmDelete = window.confirm("确定要删除吗？")
	if (confirmDelete) {
		users[userID][3].splice(id, 1)
		localStorage.setItem("users", JSON.stringify(users))
		loadData()
		sumAllPrice()
	}
}

// initialize
if (!checkLogInStatus()) {
	middleContainer.classList.add("noLogin")
	commoditiesContainer.style.display = "none"
	title.innerHTML = '<a href="/pages/login.html">您还未登陆，点此前往登陆</a>'
} else {
	loadData()
	sumAllPrice()
}
