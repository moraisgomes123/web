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
// 4. Search functionality - searches all products across categories
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");

  if (searchInput && searchBtn) {
    // Product database with categories - actual products from store
    const allProducts = [
      // Mobile Phones
      { name: "iPhone 14", category: "shop-mobile-phone.html", section: "Mobile Phones" },
      { name: "Samsung Galaxy S23", category: "shop-mobile-phone.html", section: "Mobile Phones" },
      { name: "Google Pixel 8", category: "shop-mobile-phone.html", section: "Mobile Phones" },
      
      // Phone Cases
      { name: "iPhone 14 Case", category: "shop-phone-cases.html", section: "Phone Cases" },
      { name: "Samsung S23 Case", category: "shop-phone-cases.html", section: "Phone Cases" },
      { name: "Universal Case", category: "shop-phone-cases.html", section: "Phone Cases" },
      
      // Chargers and Cables
      { name: "Fast Charger 25W", category: "shop-chargers-cables.html", section: "Chargers & Cables" },
      { name: "USB-C Cable 1m", category: "shop-chargers-cables.html", section: "Chargers & Cables" },
      { name: "Wireless Charging Pad", category: "shop-chargers-cables.html", section: "Chargers & Cables" },
      
      // Screen Protectors
      { name: "iPhone Screen Protector", category: "shop-screen-protectors.html", section: "Screen Protectors" },
      { name: "Samsung Screen Protector", category: "shop-screen-protectors.html", section: "Screen Protectors" },
      { name: "Universal Screen Protector", category: "shop-screen-protectors.html", section: "Screen Protectors" },
      
      // Smartwatch Bands
      { name: "Leather Band", category: "shop-smartwatch-bands.html", section: "Smartwatch Bands" },
      { name: "Silicone Band", category: "shop-smartwatch-bands.html", section: "Smartwatch Bands" },
      { name: "Metal Link Band", category: "shop-smartwatch-bands.html", section: "Smartwatch Bands" },
      
      // Wireless Earbuds
      { name: "Basic Wireless Earbuds", category: "shop-wireless-earbuds.html", section: "Wireless Earbuds" },
      { name: "Noise Cancelling Earbuds", category: "shop-wireless-earbuds.html", section: "Wireless Earbuds" },
      { name: "Sports Wireless Earbuds", category: "shop-wireless-earbuds.html", section: "Wireless Earbuds" }
    ];

    function performSearch() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      
      if (searchTerm === "") {
        return;
      }

      // Filter products based on search term
      const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
      );

      if (filteredProducts.length > 0) {
        // Navigate to the first matching product's category
        const firstMatch = filteredProducts[0];
        window.location.href = firstMatch.category + "?search=" + encodeURIComponent(searchTerm);
      } else {
        // Show alert if no products found
        alert("No products found matching '" + searchTerm + "'. Please try a different search.");
      }
    }

    // Search on button click
    searchBtn.addEventListener("click", performSearch);

    // Search on Enter key press
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });

    // Handle search results on category pages
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    if (searchQuery) {
      const productGrid = document.querySelector(".product-grid");
      if (productGrid) {
        const allProductCards = Array.from(productGrid.children);
        const filteredCards = allProductCards.filter(card => {
          const productName = card.querySelector("h3").textContent.toLowerCase();
          return productName.includes(searchQuery.toLowerCase());
        });

        // Update product grid to show only matching items
        productGrid.innerHTML = "";
        if (filteredCards.length > 0) {
          filteredCards.forEach(card => productGrid.appendChild(card.cloneNode(true)));
          // Re-attach buy button events
          const buyButtons = productGrid.querySelectorAll(".buy-btn");
          buyButtons.forEach(button => {
            button.addEventListener("click", function (e) {
              e.preventDefault();
              alert("🛒 Product added to your cart!");
            });
          });
        } else {
          productGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #666; padding: 20px;'>No products found matching your search in this category.</p>";
        }
      }
    }
  }
});
