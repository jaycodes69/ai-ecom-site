// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    category: "electronics",
    description: "High-quality wireless headphones with noise cancellation",
    icon: "fas fa-headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    category: "electronics",
    description: "Feature-rich smartwatch with fitness tracking",
    icon: "fas fa-clock",
  },
  {
    id: 3,
    name: "Laptop",
    price: 899.99,
    category: "electronics",
    description: "Powerful laptop for work and gaming",
    icon: "fas fa-laptop",
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    price: 24.99,
    category: "clothing",
    description: "Comfortable 100% cotton t-shirt",
    icon: "fas fa-tshirt",
  },
  {
    id: 5,
    name: "Jeans",
    price: 59.99,
    category: "clothing",
    description: "Premium denim jeans with perfect fit",
    icon: "fas fa-user-alt",
  },
  {
    id: 6,
    name: "Sneakers",
    price: 89.99,
    category: "clothing",
    description: "Comfortable running sneakers",
    icon: "fas fa-shoe-prints",
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 149.99,
    category: "home",
    description: "Automatic coffee maker with timer",
    icon: "fas fa-coffee",
  },
  {
    id: 8,
    name: "Plant Pot",
    price: 29.99,
    category: "home",
    description: "Decorative ceramic plant pot",
    icon: "fas fa-seedling",
  },
  {
    id: 9,
    name: "Table Lamp",
    price: 69.99,
    category: "home",
    description: "Modern LED table lamp",
    icon: "fas fa-lightbulb",
  },
  {
    id: 10,
    name: "Basketball",
    price: 39.99,
    category: "sports",
    description: "Professional basketball",
    icon: "fas fa-basketball-ball",
  },
  {
    id: 11,
    name: "Yoga Mat",
    price: 34.99,
    category: "sports",
    description: "Non-slip yoga and exercise mat",
    icon: "fas fa-heart",
  },
  {
    id: 12,
    name: "Dumbbells",
    price: 79.99,
    category: "sports",
    description: "Adjustable dumbbells for home workout",
    icon: "fas fa-dumbbell",
  },
];

// Shopping cart
let cart = [];

// Current filter
let currentFilter = "all";

// DOM elements
const productGrid = document.getElementById("productGrid");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");

// Initialize the website
document.addEventListener("DOMContentLoaded", function () {
  displayProducts(products);
  updateCartUI();
  setupEventListeners();
});

// Display products
function displayProducts(productsToShow) {
  productGrid.innerHTML = "";

  productsToShow.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <div class="product-image">
                <i class="₹{product.icon}"></i>
            </div>
            <div class="product-info">
                <h3>₹{product.name}</h3>
                <p>₹{product.description}</p>
                <div class="product-price">₹₹{product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(₹{product.id})">
                    Add to Cart
                </button>
            </div>
        `;
    productGrid.appendChild(productCard);
  });
}

// Filter products
function filterProducts(category) {
  currentFilter = category;

  // Update filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Filter products
  let filteredProducts = products;
  if (category !== "all") {
    filteredProducts = products.filter(
      (product) => product.category === category,
    );
  }

  displayProducts(filteredProducts);
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCartUI();
  showNotification("Product added to cart!");
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  }
}

// Update cart UI
function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <i class="₹{item.icon}"></i>
                </div>
                <div class="cart-item-details">
                    <h4>₹{item.name}</h4>
                    <div class="cart-item-price">₹₹{item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(₹{item.id}, -1)">-</button>
                        <span style="margin: 0 10px;">₹{item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(₹{item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(₹{item.id})" style="margin-left: 10px; background: #dc3545; color: white;">×</button>
                    </div>
                </div>
            `;
      cartItems.appendChild(cartItem);
    });
  }

  // Update total
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  cartTotal.textContent = total.toFixed(2);
}

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle("open");
  cartOverlay.classList.toggle("open");
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  alert(
    `Thank you for your purchase! Total: ₹₹{total.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`,
  );

  // Clear cart
  cart = [];
  updateCartUI();
  toggleCart();
}

// Search functionality
function setupEventListeners() {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    let filteredProducts = products;

    if (searchTerm) {
      filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm),
      );
    }

    // Apply current category filter if active
    if (currentFilter !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === currentFilter,
      );
    }

    displayProducts(filteredProducts);
  });

  // Contact form submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showNotification(
        "Thank you for your message! We will get back to you soon.",
      );
      this.reset();
    });
  }

  // Newsletter subscription
  const newsletterForm = document.querySelector(".newsletter");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        showNotification("Thank you for subscribing to our newsletter!");
        this.querySelector('input[type="email"]').value = "";
      }
    });
  }
}

// Scroll to products section
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
  notification.textContent = message;

  // Add animation styles
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Close cart when clicking outside
document.addEventListener("click", function (e) {
  if (!cartSidebar.contains(e.target) && !e.target.closest(".cart-icon")) {
    if (cartSidebar.classList.contains("open")) {
      toggleCart();
    }
  }
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && cartSidebar.classList.contains("open")) {
    toggleCart();
  }
});

// Add loading animation for products
function showLoading() {
  productGrid.innerHTML =
    '<div style="text-align: center; padding: 3rem; color: #666;">Loading products...</div>';
}

// Simulate loading delay for better UX
function loadProducts() {
  showLoading();
  setTimeout(() => {
    displayProducts(products);
  }, 500);
}

// Initialize category filter buttons
function initializeFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.textContent
        .toLowerCase()
        .replace(" & ", "")
        .replace(/\s+/g, "");
      const categoryMap = {
        all: "all",
        electronics: "electronics",
        clothing: "clothing",
        "home&garden": "home",
        sports: "sports",
      };
      filterProducts(categoryMap[category] || category);
    });
  });
}

// Call initialization
initializeFilterButtons();

// Add to cart animation
function addToCartAnimation(button) {
  button.innerHTML = '<i class="fas fa-check"></i> Added!';
  button.style.background = "#28a745";
  setTimeout(() => {
    button.innerHTML = "Add to Cart";
    button.style.background = "#007bff";
  }, 1000);
}

// Enhanced add to cart with animation
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCartUI();
  showNotification("Product added to cart!");

  // Find the button that was clicked and animate it
  const button = event.target;
  addToCartAnimation(button);
}

// Local storage for cart persistence
function saveCartToStorage() {
  localStorage.setItem("shopeasy-cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const savedCart = localStorage.getItem("shopeasy-cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
}

// Load cart from storage on page load
document.addEventListener("DOMContentLoaded", function () {
  loadCartFromStorage();
  displayProducts(products);
  updateCartUI();
  setupEventListeners();
});

// Save cart to storage whenever it changes
function updateCartUI() {
  // Update cart count
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Update cart items
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p style="text-align: center; color: #666; padding: 2rem;">Your cart is empty</p>';
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <i class="₹{item.icon}"></i>
                </div>
                <div class="cart-item-details">
                    <h4>₹{item.name}</h4>
                    <div class="cart-item-price">₹₹{item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(₹{item.id}, -1)">-</button>
                        <span style="margin: 0 10px;">₹{item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(₹{item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(₹{item.id})" style="margin-left: 10px; background: #dc3545; color: white;">×</button>
                    </div>
                </div>
            `;
      cartItems.appendChild(cartItem);
    });
  }

  // Update total
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  cartTotal.textContent = total.toFixed(2);

  // Save to storage
  saveCartToStorage();
}
