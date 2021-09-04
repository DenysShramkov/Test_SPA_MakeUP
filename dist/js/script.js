'use strict';

window.addEventListener('DOMContentLoaded', () => {


	const getData = async (url) => {
		const res = await fetch(url); 
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};

	getData('http://makeup-api.herokuapp.com/api/v1/products.json?product_category=liquid&product_type=eyeliner')
	.then(data => { console.log(data);
		/* data.forEach(({img, altimg, title, descr, price}) => { //деструктуризация объекта
			//наша функция render() создана выше
			//new Menu(obj.img, obj.altimg, obj.title, obj.descr, obj.price).render();
			new Menu(img, altimg, title, descr, price, 28, menuField).render(); //вызываем метод класса подставляя значения
		}); */
	});

	/* getData('https://portfolio-food-denis-default-rtdb.europe-west1.firebasedatabase.app/slider.json')
	.then(data => {
		sliderBtn('.offer__slider', 'nextBtn', 'prevBtn', data, '.offer__slide', '#current', '#total', '.offer__slider_dots');
	}); */
});