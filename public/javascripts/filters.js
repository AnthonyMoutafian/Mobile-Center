const products = document.querySelectorAll(".product-category");

const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");

const minPriceValue = document.getElementById("minPriceValue");
const maxPriceValue = document.getElementById("maxPriceValue");

const brandFilters = document.querySelectorAll(".brandFilter");
const specFilters = document.querySelectorAll(".specFilter");

function updateFilters() {

    minPriceValue.textContent =
        Number(minPrice.value).toLocaleString() + " AMD";

    maxPriceValue.textContent =
        Number(maxPrice.value).toLocaleString() + " AMD";

    const selectedBrands = [];

    brandFilters.forEach(filter => {
        if (filter.checked) {
            selectedBrands.push(filter.value);
        }
    });

    const selectedSpecs = {};

    specFilters.forEach(filter => {

        if (!filter.checked) return;

        const key = filter.dataset.filter;

        if (!selectedSpecs[key]) {
            selectedSpecs[key] = [];
        }

        selectedSpecs[key].push(filter.value);

    });

products.forEach(product => {

    let visible = true;

    const price = Number(product.getAttribute("data-price"));

    if (
        price < Number(minPrice.value) ||
        price > Number(maxPrice.value)
    ) {
        visible = false;
    }

    const brand = product.getAttribute("data-brand");

    if (
        visible &&
        selectedBrands.length &&
        !selectedBrands.includes(brand)
    ) {
        visible = false;
    }

    if (visible) {
        for (const key in selectedSpecs) {

            const value = product.getAttribute(`data-${key}`);

            if (!selectedSpecs[key].includes(value)) {
                visible = false;
                break;
            }
        }
    }

    product.style.display = visible ? "block" : "none";

});

}

minPrice.addEventListener("input", updateFilters);
maxPrice.addEventListener("input", updateFilters);

brandFilters.forEach(filter =>
    filter.addEventListener("change", updateFilters)
);

specFilters.forEach(filter =>
    filter.addEventListener("change", updateFilters)
);

updateFilters();