const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

$('#nav-bar').onclick = () => document.body.classList.toggle('dark');

// Hover Animation
const magicMouse = (e) => {
	const loaders = $$('.loader-container');
	const fiChild = loaders[loaders.length - 1];
	const parDiv = document.createElement('div');
	const childDiv = document.createElement('div');
	parDiv.className = 'loader-container';
	childDiv.className = 'loader';

	parDiv.appendChild(childDiv);
	document.body.insertAdjacentElement('afterbegin', parDiv);

	parDiv.style.left = e.clientX - 50 + 'px';
	parDiv.style.top = e.clientY - 50 + 'px';

	if ($$('.loader-container').length > 45) document.body.removeChild(fiChild);
};
$('.content').onmousemove = magicMouse;

// History Handle
const historyTrack = localStorage.getItem('historyTrack')
	? JSON.parse(localStorage.getItem('historyTrack'))
	: '';
let cnt = JSON.parse(localStorage.getItem('history')) || 0;
$('.container').innerHTML = historyTrack;
$('.cnt').innerHTML = cnt;

$('.clear-btn').onclick = () => {
	localStorage.setItem('historyTrack', '');
	localStorage.setItem('history', '0');
	$('.container').innerHTML = '';
	$('.cnt').innerHTML = cnt = 0;
};

// Away Handle
document.onvisibilitychange = () => {
	if (document.hidden) {
		document.title = 'U r away';
		$('.cnt').innerHTML = ++cnt;

		const today = new Date();
		const time = `${today.toLocaleDateString()} : ${today.getHours()}h ${today.getMinutes()}min ${today.getSeconds()}s`;

		$('.container').innerHTML =
			`<p><span style="color:var(--color2)">${cnt}.</span> ${time}</p>` +
			$('.container').innerHTML;

		localStorage.setItem('history', JSON.stringify($('.cnt').innerHTML));
		localStorage.setItem(
			'historyTrack',
			JSON.stringify($('.container').innerHTML)
		);
	} else document.title = 'U r here';
};
