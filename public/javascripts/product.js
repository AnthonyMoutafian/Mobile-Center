const products = document.querySelectorAll(".product");

const brandFilters = document.querySelectorAll(".brandFilter");
const specFilters = document.querySelectorAll(".specFilter");

const minSlider = document.querySelector("#minPrice");
const maxSlider = document.querySelector("#maxPrice");

const minText = document.querySelector("#minPriceValue");
const maxText = document.querySelector("#maxPriceValue");

function filterProducts() {

  const selectedBrands = [...brandFilters]
    .filter(b => b.checked)
    .map(b => b.value);

  const selectedSpecs = [...specFilters];

  const minPrice = Number(minSlider.value);
  const maxPrice = Number(maxSlider.value);

  minText.textContent = minPrice.toLocaleString() + " AMD";
  maxText.textContent = maxPrice.toLocaleString() + " AMD";

  products.forEach(product => {

    const price = Number(product.dataset.price);
    const brand = product.dataset.brand;

    let show = true;

    if (price < minPrice || price > maxPrice) {
      show = false;
    }

    if (selectedBrands.length && !selectedBrands.includes(brand)) {
      show = false;
    }

    selectedSpecs.forEach(spec => {

      const key = spec.dataset.title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

      const productValue = product.dataset[key];

      if (spec.checked && productValue !== spec.value) {
        show = false;
      }

    });

    product.style.display = show ? "flex" : "none";

  });
}

brandFilters.forEach(f => f.addEventListener("change", filterProducts));
specFilters.forEach(f => f.addEventListener("change", filterProducts));
minSlider.addEventListener("input", filterProducts);
maxSlider.addEventListener("input", filterProducts);

filterProducts();
