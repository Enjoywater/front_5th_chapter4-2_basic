async function loadProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);  
}

function displayProducts(products) {

    // Find the container where products will be displayed
    const container = document.querySelector('#all-products .container');

    if (!container) return;

    const fragment = document.createDocumentFragment();
   
    // Iterate over each product and create the HTML structure safely
    products.forEach(product => {
        // Create the main product div
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        // Create the product picture div
        const pictureDiv = document.createElement('div');
        pictureDiv.classList.add('product-picture');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = `product: ${product.title}`;
        img.width=250;
        img.loading = 'lazy';
        pictureDiv.appendChild(img);

        // Create the product info div
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('product-info');

        const category = document.createElement('h5');
        category.classList.add('categories');
        category.textContent = product.category;

        const title = document.createElement('h4');
        title.classList.add('title');
        title.textContent = product.title;

        const price = document.createElement('h3');
        price.classList.add('price');

        const priceSpan = document.createElement('span');
        priceSpan.textContent = `US$ ${product.price}`;
        price.appendChild(priceSpan);

        const button = document.createElement('button');
        button.textContent = 'Add to bag';
        button.setAttribute('aria-label', `Add ${product.title} to bag`);

        // Append elements to the product info div
        infoDiv.appendChild(category);
        infoDiv.appendChild(title);
        infoDiv.appendChild(price);
        infoDiv.appendChild(button);

        // Append picture and info divs to the main product element
        productElement.appendChild(pictureDiv);
        productElement.appendChild(infoDiv);

        // Append the new product element to the container
        fragment.appendChild(productElement);
    });

    container.appendChild(fragment);
}

function heavyOperationFunc() {
    let i = 0;

    function chunk() {
        const end = Math.min(i + 100000, 10000000);

        for (; i < end; i++) {
            const temp = Math.sqrt(i) * Math.sqrt(i);
        }

        if (i < 10000000) {
            setTimeout(chunk, 0); // 다음 이벤트 루프에 실행
        } 
    }

    chunk();
}

window.onload = () => {
    let status = 'idle';
    let productSection = document.querySelector('#all-products');

    window.onscroll = () => {
        let position = productSection.getBoundingClientRect().top - (window.scrollY + window.innerHeight);

        if (status == 'idle' && position <= 0) {
            loadProducts();

            // 무거운 연산을 비동기로 쪼개서 실행
            heavyOperationFunc();
        }
    }
}
