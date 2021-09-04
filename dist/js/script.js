'use strict';

window.addEventListener('DOMContentLoaded', () => {

	const getData = async (url) => {
		const res = await fetch(url); 
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};
	let filterBrands,
		brandsLength,
		maxPriceFilter = 1000,
		minPriceFilter = 0;


	getData('http://makeup-api.herokuapp.com/api/v1/products.json?product_category=liquid&product_type=eyeliner')
	.then(data => {
		getListOfBrands(data, '#brand');
		return data;
	})
	.then(data => {
		SortData(data);
	});

	let dataSort;

	function SortData(data) {
		const buttons = document.querySelector('.product__sort');

		dataSort = data;
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
			} else if (e.target.dataset.sort ==='Z-A') {
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
			} else if (e.target.dataset.sort === 'pricedown') {
				dataSort = data.sort(function(a, b) {
					return a.price - b.price;
				});
			} else if (e.target.dataset.sort === 'priceup') {
				dataSort = data.sort(function(a, b) {
					return b.price - a.price;
				});
			} 

			renderProductItem(dataSort, '.product__container');
		});
		listForFilter('brand', dataSort);
		SetMaxPrice(dataSort);
		SetMinPrice(dataSort);
	}

	function colorsArray(array) {
		let colorsItems = '';
		for (const color of array) {
			colorsItems += `<div class="product__color" style="background-color: ${color.hex_value};>
			</div>`;
		};
		return colorsItems;
	}

	function renderBrendList(data, id) {
		const ul = document.querySelector(id);
		ul.innerHTML = '';
		function brands(arr) {
			return arr.sort().filter(function(item, pos, ary) {
				return !pos || item != ary[pos - 1];
			});
		}
		const sorted = brands(data);
		brandsLength = sorted.length;
		sorted.forEach(item => {
			if (item !== '' && item !== null) {
				const brendLi = document.createElement('li');
				brendLi.classList.add('filter__li_item');
				brendLi.textContent = item;
				brendLi.dataset.brand = item;
				ul.append(brendLi);
			}
		});
	}

	function listForFilter(id, data) {
		const element = document.querySelector(`#${id}`);
		element.addEventListener('click', (e) => {
			if (e.target.classList.contains('filter__li_item')) {
				if (filterBrands.length > brandsLength - 5) {
					filterBrands = [];
				}
				filterBrands.push(e.target.getAttribute(`data-${id}`));
				renderProductItem(data, '.product__container');
			}
		});
	}

	function getListOfBrands(data, id) {
		let brandsArr = [];
		data.forEach(item => {
			brandsArr.push(item.brand);
		});
		filterBrands = brandsArr;
		renderBrendList(brandsArr, id);
	}

	function renderProductItem(data, parentContainer) {
		const parent = document.querySelector(parentContainer);
		parent.innerHTML = '';
		for (const item of data) {
			if (filterBrands.includes(item.brand) && Math.round(item.price) >= minPriceFilter && Math.round(item.price) <= maxPriceFilter) {
				const productItem = document.createElement('div');
				productItem.classList.add('product__item');
				const colorsHTML = colorsArray(item.product_colors);
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
					<div class="product__color_section">${colorsHTML}</div>
				</div>
				`;

				parent.append(productItem);
			}
		}
	}

	const priceFilterMax = document.querySelector('#maxprice'),
		priceFilterMin = document.querySelector('#minprice');

	function SetMaxPrice(data) {
		priceFilterMax.addEventListener('change', () => {
			maxPriceFilter = priceFilterMax.value;
			console.log(maxPriceFilter);
			renderProductItem(data, '.product__container');
		});
	}
	function SetMinPrice(data) {
		priceFilterMin.addEventListener('change', () => {
			minPriceFilter = priceFilterMin.value;
			console.log(minPriceFilter);
			renderProductItem(data, '.product__container');
		});
	}
		

});