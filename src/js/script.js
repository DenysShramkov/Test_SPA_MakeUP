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
	.then(data => {
		console.log(data);
		renderProductItem(data, '.product__container');
	});

	function renderProductItem (data, parentContainer) {
		const parent = document.querySelector(parentContainer);

		data.forEach(item => {
			const productItem = document.createElement('div');
			productItem.classList.add('product__item');
			productItem.innerHTML = `
			<div class="product__body">
				<div class="product__image">
					<img class="" src=${item.api_featured_image}>
				</div>
				<div class="">
					<h3>${item.brand}</h3>
					<h4>${item.name}</h4>
					<p><span class="bold">Category: </span>${item.category}</p>
					<p>${item.price_sign}${item.price}</p>
					<p></p>
				</div>
				<div class="product__color_section">
					<div class="product__color" style="background-color: #000000; height: 20px; margin: 0 3px 3px 3px">
					</div>
				</div>
			</div>
			`;
			parent.append(productItem);
		});
	}

	/* getData('https://portfolio-food-denis-default-rtdb.europe-west1.firebasedatabase.app/slider.json')
	.then(data => {
		sliderBtn('.offer__slider', 'nextBtn', 'prevBtn', data, '.offer__slide', '#current', '#total', '.offer__slider_dots');
	}); */
});