const openSearch = document.querySelector(".search")
const searchButton = document.querySelector(".searchButton")
const box = document.querySelector(".box")
const container = document.querySelector(".container")
const searchState = document.querySelector(".searchState")
const users = JSON.parse(localStorage.getItem("users"))
let userID = -1

// initialize
// 搜索框状态
var state = false

// 登录状态检测
const checkLogInStatus = () => {
	const users = JSON.parse(localStorage.getItem("users"))
	for (let i = 0; i < users.length; i++)
		if (users[i][2]) {
			userID = i
			return true
		}
	return false
}

// 搜索框以外区域点击检测
openSearch.addEventListener("click", (event) => {
	if (state == false) {
		open()
	} else {
		close()
	}
})

// 搜索框以外区域点击
document.addEventListener("click", (event) => {
	if (!container.contains(event.target)) {
		close()
	}
})

// 搜索框打开
const open = () => {
	searchState.innerHTML =
		'<div class="searchContainer"><input class="searchBox" type="text" placeholder="搜索硬件工坊" /><button onclick="goToSearch()" class="searchButton"><img src="/source/icon/search.svg" alt="" /></button></div><div class="accountManager"><h2>账号管理</h2><p></p><button id="logOutButton" class="button" onclick="logOut()">退出登录</button></div>'
	searchState.style.display = "block"
	box.style.height = "100%"
	box.style.backgroundColor = "rgba(0, 0, 0, 0)"
	container.style.height = "400px"
	container.style.backgroundColor = "rgba(0,0,0,1)"
	searchState.style.opacity = "1"
	const p = document.querySelector(".accountManager p")
	const logOutButton = document.querySelector("#logOutButton")

	// 账号模块
	if (checkLogInStatus()) {
		for (let i = 0; i < localStorage.getItem("users").length; i++) {
			if (JSON.parse(localStorage.getItem("users"))[i][2] == true) {
				p.innerText = "当前账号为：" + JSON.parse(localStorage.getItem("users"))[i][0]
				break
			}
		}
	} else {
		p.innerText = "当前未登录"
		logOutButton.style.display = "none"
	}
	state = true
}

// 搜索框关闭
const close = () => {
	searchState.innerHTML = ""
	box.style.height = "44px"
	box.style.backgroundColor = "rgba(0, 0, 0, 0.75)"
	container.style.height = "44px"
	container.style.backgroundColor = ""
	searchState.style.opacity = "0"
	setTimeout(() => {
		searchState.style.display = "none"
	}, 600)
	state = false
}

// 登出
const logOut = () => {
	let users = JSON.parse(localStorage.getItem("users"))
	for (let i = 0; i < users.length; i++) {
		if (users[i][2] == true) {
			users[i][2] = false
			localStorage.setItem("users", JSON.stringify(users))
			break
		}
	}
	window.location.reload()
}

// 搜索前往
const goToSearch = () => {
	const searchBox = document.querySelector(".searchBox").value.toLowerCase()
	if (searchBox != "") return (window.location.href = "/pages/search.html?search=" + searchBox)
	else alert("请输入搜索内容")
}
