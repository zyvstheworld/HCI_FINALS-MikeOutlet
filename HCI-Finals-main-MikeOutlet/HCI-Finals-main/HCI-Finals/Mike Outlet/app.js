const wrapper = document.querySelector(".sliderwrapper");
const menuItems = document.querySelectorAll(".menuItem");
const productDescriptions = document.querySelectorAll(".productDescription");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 5090,
    description: "Air Force shoes are indeed comfortable! They  re crafted with high-quality materials that provide cushioning for your fee",
    colors: [
      {
        code: "black",
        img: "./img/air.png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    description: "Air Jordan is undoubtedly one of the most popular and iconic sneaker brands in the world.",
    price: '6,290',
    
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan.png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: '4,490',
    description: "Nike Blazer shoes have been making a comeback, and they’re quite popular right now! These classic sneakers offer a blend of style and comfort.",
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: '3,990',
    description: "The Nike Crater Impact Women’s Shoes are a game-changing sneaker that combines style, sustainability, and comfort.",
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: '3,790',
    description: "Hippie shoes have always held a special place in the world of fashion, representing not only a particular style but also a lifestyle emphasizing freedom, peace, and individuality.",
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // Change the chosen product
    choosenProduct = products[index];

    // Change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "₱" + choosenProduct.price.toLocaleString(); // Format price with commas
    currentProductImg.src = choosenProduct.colors[0].img;

    // CHange Description
    const productDesc = document.querySelector(".productDesc");
    productDesc.textContent = choosenProduct.description; 

    // Assign new colors
    currentProductColors.forEach((color, idx) => {
      color.style.backgroundColor = choosenProduct.colors[idx].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

// Add event listener for size selection
document.querySelector(".sizes").addEventListener("click", (event) => {
  if (event.target.classList.contains("size")) {
    // Toggle 'selected' class on the clicked size
    event.target.classList.toggle("selected");
  }
});


close.addEventListener("click", () => {
  payment.style.display = "none";
});


document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.querySelector('.cart-items');
  let totalPrice = 0;

   // Function to update total price
   const updateTotalPrice = () => {
    const totalElement = document.querySelector('.total-price');
    totalElement.textContent = `Total: ₱${totalPrice.toLocaleString()}`;
  };

  // Function to add item to cart
  window.addToCart = (productName, productPrice, productSize) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${productName} - Size: ${productSize} - ₱${productPrice.toLocaleString()}</span>
      <button class="removeButton" onclick="removeFromCart(this)">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
    totalPrice += productPrice;
    updateTotalPrice();
  };

  // Function to remove item from cart
  window.removeFromCart = (button) => {
    button.parentElement.remove();
    totalPrice -= productPrice;
    updateTotalPrice();
  };

  // Function to open checkout modal
  window.openCheckout = () => {
    document.getElementById('checkoutModal').style.display = 'block';
  };

  // Function to close checkout modal
  window.closeCheckout = () => {
    document.getElementById('checkoutModal').style.display = 'none';
  };

  // Event listener for checkout form submission
  document.getElementById('checkoutForm').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Payment processed successfully!');
    document.getElementById('checkoutModal').style.display = 'none';
    while (cartItemsContainer.firstChild) {
      cartItemsContainer.removeChild(cartItemsContainer.firstChild);
    }
    totalPrice = 0;
    updateTotalPrice();
  });

  // Add to cart button functionality
  document.querySelector(".productButton").addEventListener("click", () => {
    const selectedSize = document.querySelector(".size.selected");
    if (selectedSize) {
      const productTitle = document.querySelector(".productTitle").textContent;
      const productPrice = parseFloat(document.querySelector(".productPrice").textContent.replace('₱', '').replace(',', ''));
      const productSize = selectedSize.textContent;
      addToCart(productTitle, productPrice, productSize);
    } else {
      alert("Please select a size before proceeding with the purchase!");
    }
  });
});

