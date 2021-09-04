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
		SortData(data);
	});

	function SortData(data) {
		const buttons = document.querySelector('.product__sort');

		let dataSort = data;
		renderProductItem(dataSort, '.product__container');

		buttons.addEventListener('click', (e) => {
			if (e.target.dataset.sort === 'A-Z') {
				dataSort = data.sort(function(a, b) {
					let nameA = a.name.toUpperCase();
					let nameB = b.name.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
				});
			} else if (e.target.dataset.sort == 'Z-A') {
				dataSort = data.sort(function(a, b) {
					let nameA = a.name.toUpperCase();
					let nameB = b.name.toUpperCase();
					if (nameA > nameB) {
						return -1;
					}
					if (nameA < nameB) {
						return 1;
					}
				});
			} else if (e.target.dataset.sort == 'pricedown') {
				dataSort = data.sort(function(a, b) {
					return a.price - b.price;
				});
			} else if (e.target.dataset.sort == 'priceup') {
				dataSort = data.sort(function(a, b) {
					return b.price - a.price;
				});
			} 

			renderProductItem(dataSort, '.product__container');

		});
	}

	function renderProductItem (data, parentContainer) {
		const parent = document.querySelector(parentContainer);
		parent.innerHTML = '';
		data.forEach((item) => {
			const productItem = document.createElement('div');
			productItem.classList.add('product__item');
			productItem.innerHTML = `
			<div class="product__body">
				<div class="product__image">
					<img class="" src=${item.api_featured_image}>
				</div>
				<div class="product__text_block">
					<h3>${item.brand}</h3>
					<h4>${item.name}</h4>
					<p><span class="bold">Category: </span>${item.category}</p>
					<p>$${item.price}</p>
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
});