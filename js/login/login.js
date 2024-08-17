const logInModule = document.querySelector(".logIn")
const signInModule = document.querySelector(".signIn")

const logIn = () => {
	const username = document.querySelector("#username").value.toLowerCase()
	const password = document.querySelector("#password").value
	for (let i = 0; i < users.length; i++) {
		if (username == users[i][0] && password == users[i][1]) {
			users[i][2] = true
			localStorage.setItem("users", JSON.stringify(users))
			return (window.location.href = "/pages/shoppingCart.html")
		}
	}
	return alert("用户名或密码错误")
}

const signIn = () => {
	const username = document.querySelector("#usernameSign").value.toLowerCase()
	const password = document.querySelector("#passwordSign").value
	for (let i = 0; i < users.length; i++) {
		if (username == users[i][0]) {
			return alert("用户名已存在")
		}
	}
	const newUser = [username, password, false, []]
	users.push(newUser)
	localStorage.setItem("users", JSON.stringify(users))
	window.location.href = "/pages/login.html"
}

const toSignIn = () => {
	signInModule.style.display = "block"
	logInModule.style.display = "none"
}

const toLogIn = () => {
	signInModule.style.display = "none"
	logInModule.style.display = "block"
}
