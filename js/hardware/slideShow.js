const imgContainer = document.querySelector(".imgContainer")
const currentPageIndex = site.match(/type=([^ ]+)/g)[0].split("=")[1]
const getDatas = JSON.parse(localStorage.getItem("slideShowImgs"))[currentPageIndex]
let currentIndex = 0

// initialize
imgContainer.innerHTML = '<img class="imgStyle" src="' + getDatas[0] + '" alt="" />'
const img = document.querySelector(".imgStyle")

// 轮播时间设置
let intervalTime
if (getDatas.length === 1) {
	intervalTime = null // 如果图片只有1张，停止轮播
} else if (getDatas.length === 2) {
	intervalTime = 6000 // 如果图片有2张，间隔6秒
} else {
	intervalTime = 3000 // 对于更多图片，间隔3秒
}

if (intervalTime !== null) {
	const timer = setInterval(() => {
		img.style.opacity = 0
		setTimeout(() => {
			img.src = getDatas[currentIndex]
			img.style.opacity = 1
		}, 500)
		currentIndex++
		if (currentIndex >= getDatas.length) currentIndex = 0
	}, intervalTime)
}
