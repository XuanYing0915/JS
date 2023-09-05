/** @format */

// 現在時間
// 使用時間物件
const now = new Date();

//定義
const nowTime = document.getElementById('nowTime');
const today = document.getElementById('today');

let calendar = document.getElementById('calendar');

console.log(nowTime, today, calendar);

const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const week = now.getDay();

console.log(year, month, date, week);

// ------------------------------------------------------------
// 星期物件
weekResult = ['日', '一', '二', '三', '四', '五', '六'];
// ------------------------------------------------------------
// 顯示日期
today.innerText = `${year} 年 ${month} 月 ${date} 日  星期${weekResult[week]}`;
// ------------------------------------------------------------

// 每秒偵測時間跳轉
// window.onload = 'time()';
function time() {
	// 定義 小時 分 秒的時間物件
	const hr = new Date().getHours();
	const min = new Date().getMinutes();
	const s = new Date().getSeconds();
	// 設定12小時制
	let hr12 = '';
	let AMPM = '';
	if (hr > 13) {
		AMPM = '下午';
		hr12 = hr - 12;
	} else if (hr - 12 === 0) {
		AMPM = '中午';
	} else {
		AMPM = '上午';
		hr12 = hr;
	}

	// 分鐘個位數+前綴'0'
	const prefix = min <= 9 ? '0' : '';
	strMin = prefix + min;
	// 秒數個位數+前綴'0'
	const strS = s <= 9 ? '0' + s : '' + s;

	// 顯示時間
	nowTime.innerHTML = `${AMPM} ${hr12} 點 ${strMin} 分 ${strS}秒`;
	// setInterval('執行函式',間隔多少時間執行) 會1秒內執行很多次
	// setTimeout('time()', 1000) 只執行一次  不過這函式會一直呼叫  所以等於1秒執行很多次
	setTimeout('time()', 1000);
}

// ------------------------------------------------------------
// 萬年曆選單
const yearChange = document.getElementById('yearChange');
const monthChange = document.getElementById('monthChange');

console.log(yearChange, monthChange);

// 生成年份的遞減函式選單(預設為今年)
function makeYearOptions(year) {
	let options = '';
	for (let i = year + 20; i > year; i--) {
		options += `<option value="${i}">${i}</option>`;
	}
	options += `<option value="${year}" selected="${year}">${year}</option>`;
	for (let i = year - 1; i >= 1; i--) {
		options += `<option value="${i}">${i}</option>`;
	}
	return options;
}

// 加入年份選單
yearChange.innerHTML = makeYearOptions(year);

// 生成年份的遞減函式選單(預設為今月)
function makeMonthOptions(min, max) {
	let options = '';
	for (let i = min; i < max; i++) {
		if (i == Number(month)) {
			options += `<option value="${i}" selected="${i}">${i}</option>`;
		} else {
			options += `<option value="${i}">${i}</option>`;
		}
	}
	return options;
}

// 加入月份選單
monthChange.innerHTML = makeMonthOptions(1, 12 + 1);
// ------------------------------------------------------------
// 設定選單年月觸發萬年曆

// 預設為當年當月
let makeYear = year;
let makeMonth = month;

// 萬年曆函式
function makeCalendar(makeYear, makeMonth) {
	// 萬年曆
	// 確認一個月幾天
	// new Date(year, month, 0).getDate()  日固定設為 0
	const days = new Date(makeYear, makeMonth, 0).getDate();


	// 確認一個月首天是星期幾
	// new Date(年/月/1號 ).getDay()=第一天的星期
	const FirstToWeekDay = new Date(`${makeYear}/${makeMonth}/1`).getDay();


	// 算出整個月所需的格數 =(首日星期+實際天數)
	const data = days + FirstToWeekDay;

	// ------------------------------------------------------------
	// 萬年曆表格
	// 建立空格迴圈
	const spaceTd = Array(FirstToWeekDay).fill('');

	// 建立實際天數迴圈
	const daysTd = Array(days)
		.fill('')
		.map((value, index) => index + 1);

	console.log(daysTd);
	// 裝表格陣列
	const allData = [...spaceTd, ...daysTd];

	const a = `<td class='y${makeYear}m${makeMonth}'></td>`;
	console.log(a);
	// 建立表格
	let table = '<tr>';

	for (let i = 0; i < allData.length; i++) {
		// 做出星期日 假日樣式
		if (i % 7 === 0 && allData[i]) {
			table += `<td id="${makeYear}Y${makeMonth}M${i}D" class="sunday touch">${allData[i]}</td>`;
		}
		// 做出星期六 假日樣式
		else if (i % 7 === 6) {
			table += `<td id="${makeYear}Y${makeMonth}M${i}D" class="satday touch">${allData[i]}</td>`;
		} else {
			table += `<td id="${makeYear}Y${makeMonth}M${i}D" class="touch">${allData[i]}</td>`;
		}

		if ((i + 1) % 7 === 0) {
			table += '</tr><tr>';
		}
	}

	console.log(table, calendar);
	table += '</tr>';

	calendar.innerHTML = table;
}

// 生成預設當年當月的萬年曆
makeCalendar(makeYear, makeMonth);
// ------------------------------------------------------
// 指定今天日期的樣式
// 抓今日id

function pushTodayClass(makeYear, makeMonth) {
	let todayStyle = document.getElementById(`${year}Y${month}M${date}D`);
	if (todayStyle) {
		todayStyle.setAttribute('class', 'today');
	}
}
pushTodayClass(makeYear, makeMonth);
// ------------------------------------------------------

// 改變年月在生成萬年曆
yearChange.addEventListener('change', function () {
	makeYear = yearChange.value;
	console.log(makeYear);
	makeCalendar(makeYear, makeMonth);
	// 呼叫今日日期樣式檢查
	pushTodayClass(makeYear, makeMonth);
});

monthChange.addEventListener('change', function () {
	makeMonth = monthChange.value;
	console.log(makeMonth);
	makeCalendar(makeYear, makeMonth);
	// 呼叫今日日期樣式檢查
	pushTodayClass(makeYear, makeMonth);
});

// --------------------------------------
// 備忘錄
// 監聽按鈕
const noteButton = document.getElementById('noteButton');
const inputMemo = document.getElementById('inputMemo');
const noteList = document.getElementById('noteList');
const noteListUl = document.getElementById('noteListUl');
const reseltBtn = document.getElementById('reseltBtn');



// 空陣列裝input
let noteData = [];

function note() {
	let value = inputMemo.value;
	noteData.push(value);
	inputMemo.value = '';
	let noteResult = '';
	// 建立onclick事件  加入變數 
	// 讓這函式的便跟id變數相同 繼而使用帶入id
	for (i = 0; i < noteData.length; i++) {
		let reseltBtn = "reseltBtn" + i;
		noteResult += `<li id="todo${i}" class="noteLi">
		<span>${noteData[i]}</span>
		<button id=`+ reseltBtn + ` onclick="reseltListTodo(` + i + `)">
		<i class="fa-solid fa-check" style="color: #00ff59;"></i></button>
		</li>`;
	};
	console.log(noteResult);
	// 輸入進html
	noteList.innerHTML = noteResult;
}

noteButton.addEventListener('click', note);

// 清除list的按鈕

reseltBtn.addEventListener('click', reseltListTodo);
function reseltListTodo(myid) {
	let thisLiId = "todo" + myid;
	const result = document.getElementById(thisLiId);
	result.remove();
};

// 增加行事曆







