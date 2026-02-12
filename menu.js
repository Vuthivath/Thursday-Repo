// const cartIcon = document.querySelector("#cart-icon");
// const cart = document.querySelector(".cart");
// const cartClose = document.querySelector("#cart-close");
// cartIcon.addEventListener("click", () => cart.classList.add("active"));
// cartClose.addEventListener("click", () => cart.classList.remove("active"));
// document.addEventListener('DOMContentLoaded', () => {
//     const cartContent = document.querySelector('.cart-content');
//     const addCartButtons = document.querySelectorAll('.add-cart');

//     addCartButtons.forEach((button) => {
//         button.addEventListener('click', (event) => {
//             const productBox = event.target.closest('.pastries-container');

//             const productImgSrc = productBox.querySelector('img').src;
//             const productTitle = productBox.querySelector('.title-prod').textContent;
//             const productPrice = productBox.querySelector('.price').textContent;

//             const cartItems = cartContent.querySelectorAll('.cart-product-title');
//             for (let item of cartItems){
//                 if(item.textContent === productTitle){
//                     alert("This item is already in the cart.");
//                     return;
//                 }
//             }

//             const cartBox = document.createElement('div');
//             cartBox.classList.add('cart-box');

//             cartBox.innerHTML = `
//         <img src="${productImgSrc}" class="cart-img">
//         <div class="cart-detail">
//           <h2 class="cart-product-title">${productTitle}</h2>
//           <span class="cart-price">${productPrice}</span>
//           <div class="cart-qty">
//             <button class="dec">-</button>
//             <span class="number">1</span>
//             <button class="inc">+</button>
//           </div>
//           <div class="cart-remove">
//                         <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
//                             fill="currentColor" viewBox="0 0 24 24" >
//                             <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path>
//                         </svg>
//                     </div>
//         </div>
//       `;

//             cartContent.appendChild(cartBox);
//             cartBox.querySelector('.cart-remove').addEventListener('click', () => {
//                 cartBox.remove();
//                 updateTotalPrice();
//             });

//             cartBox.querySelector('.cart-qty').addEventListener('click', (event) => {
//                 const numberElement = cartBox.querySelector('.number');
//                 const decrementButton = cartBox.querySelector('.dec');

//                 let quantity = parseInt(numberElement.textContent, 10);

//                 if (event.target.classList.contains('dec') && quantity > 1) {
//                     quantity--;
//                     if (quantity === 1) {
//                         decrementButton.style.color = '#999';
//                     }
//                 }

//                 else if (event.target.classList.contains('inc')) {
//                     quantity++;
//                     decrementButton.style.color = '#333';
//                 }

//                 numberElement.textContent = quantity;
//                 updateTotalPrice();
//             });
//         });
//     });
//     updateTotalPrice();
// });
//     const updateTotalPrice = () => {
//         const totalPriceElement = document.querySelector('.total-price');
//         const cartContent = document.querySelector('.cart-content'); // make sure we get this fresh
//         const cartBoxes = cartContent.querySelectorAll('.cart-box');

//         let total = 0;

//         cartBoxes.forEach((cartBox) => {
//             const priceElement = cartBox.querySelector('.cart-price');
//             const quantityElement = cartBox.querySelector('.number');

//             const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ''));
//             const quantity = parseInt(quantityElement.textContent, 10);

//             total += price * quantity;
//         });

//         totalPriceElement.textContent = `$${total.toFixed(2)}`;
//     };

const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('#cart-close');

cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', () => cart.classList.remove('active'));

document.addEventListener('DOMContentLoaded', () => {
    const cartContent = document.querySelector('.cart-content');
    const totalPriceElement = document.querySelector('.total-price');
    const addCartButtons = document.querySelectorAll('.add-cart');

    // ====== TOTAL PRICE FUNCTION ======
    const updateTotalPrice = () => {
        const cartBoxes = cartContent.querySelectorAll('.cart-box');
        let total = 0;

        cartBoxes.forEach((cartBox) => {
            const price = parseFloat(cartBox.querySelector('.cart-price').textContent.replace(/[^0-9.]/g, ''));
            const quantity = parseInt(cartBox.querySelector('.number').textContent, 10);

            total += price * quantity;
        });

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
        saveCartToLocalStorage(); // Save after updating
    };

    // ====== SAVE CART TO LOCALSTORAGE ======
    const saveCartToLocalStorage = () => {
        const cartBoxes = cartContent.querySelectorAll('.cart-box');
        const cartData = [];

        cartBoxes.forEach((cartBox) => {
            cartData.push({
                title: cartBox.querySelector('.cart-product-title').textContent,
                price: cartBox.querySelector('.cart-price').textContent,
                quantity: parseInt(cartBox.querySelector('.number').textContent, 10),
                image: cartBox.querySelector('.cart-img').src,
            });
        });

        localStorage.setItem('cartItems', JSON.stringify(cartData));
    };

    // ====== ADD TO CART BUTTONS ======
    addCartButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const productBox = event.target.closest('.pastries-container');
            const productImgSrc = productBox.querySelector('img').src;
            const productTitle = productBox.querySelector('.title-prod').textContent;
            const productPrice = productBox.querySelector('.price').textContent;

            // Prevent duplicates
            const cartItems = cartContent.querySelectorAll('.cart-product-title');
            for (let item of cartItems) {
                if (item.textContent === productTitle) {
                    alert('This item is already in the cart.');
                    return;
                }
            }

            // Create cart item
            const cartBox = document.createElement('div');
            cartBox.classList.add('cart-box');
            cartBox.innerHTML = `
                <img src="${productImgSrc}" class="cart-img">
                <div class="cart-detail">
                  <h2 class="cart-product-title">${productTitle}</h2>
                  <span class="cart-price">${productPrice}</span>
                  <div class="cart-qty">
                    <button class="dec">-</button>
                    <span class="number">1</span>
                    <button class="inc">+</button>
                  </div>
                  <div class="cart-remove">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                        fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path>
                    </svg>
                  </div>
                </div>
            `;
            cartContent.appendChild(cartBox);

            // ====== REMOVE ITEM ======
            cartBox.querySelector('.cart-remove').addEventListener('click', () => {
                cartBox.remove();
                updateTotalPrice();
            });

            // ====== QUANTITY BUTTONS ======
            cartBox.querySelector('.cart-qty').addEventListener('click', (event) => {
                const numberElement = cartBox.querySelector('.number');
                const decButton = cartBox.querySelector('.dec');
                let qty = parseInt(numberElement.textContent, 10);

                if (event.target.classList.contains('dec') && qty > 1) {
                    qty--;
                    if (qty === 1) decButton.style.color = '#999';
                } else if (event.target.classList.contains('inc')) {
                    qty++;
                    decButton.style.color = '#333';
                }

                numberElement.textContent = qty;
                updateTotalPrice();
            });

            // Update total immediately after adding
            updateTotalPrice();
        });
    });
});
