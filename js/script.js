// 1. Product Sorting and Filtering on products.html
document.addEventListener("DOMContentLoaded", () => {
  const priceSort = document.getElementById("price");
  const typeFilter = document.getElementById("type");
  const productGrid = document.querySelector(".product-grid");

  if (priceSort && typeFilter && productGrid) {
    const originalProducts = Array.from(productGrid.children);

    priceSort.addEventListener("change", applyFilters);
    typeFilter.addEventListener("change", applyFilters);

    function applyFilters() {
      let products = [...originalProducts];

      // Filter by type
      const type = typeFilter.value;
      if (type !== "all") {
        products = products.filter(card =>
          card.querySelector("h3").textContent.toLowerCase().includes(type.toLowerCase())
        );
      }

      // Sort by price (fake prices in this demo — sorting by text length as placeholder)
      const priceOrder = priceSort.value;
      products.sort((a, b) => {
        // Simulating price sort using length of description
        const aVal = a.querySelector("p").textContent.length;
        const bVal = b.querySelector("p").textContent.length;
        return priceOrder === "low-high" ? aVal - bVal : bVal - aVal;
      });

      // Clear and re-render
      productGrid.innerHTML = "";
      products.forEach(p => productGrid.appendChild(p));
    }
  }

  // 2. Add alert on 'Buy Now' buttons
  const buyButtons = document.querySelectorAll(".buy-btn");
  buyButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      alert("🛒 Product added to your cart!");
    });
  });

  // 3. Highlight current nav link (basic enhancement)
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.style.borderBottom = "2px solid #ffcc00";
    }
  });
});