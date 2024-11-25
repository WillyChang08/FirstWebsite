// 產品數據存儲
let products = JSON.parse(localStorage.getItem('products')) || [];

顯示產品列表
function displayProducts() {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>價格: $${product.price}</p>
                <p>類別: ${product.category}</p>
                <img src="${product.image}" alt="${product.name}">
                ${window.location.pathname.includes('remove.html') ? `<button onclick="removeProduct(${index})">下架</button>` : ''}
            `;
            productList.appendChild(productElement);
        });
    }
}

// 上架產品
if (window.location.pathname.includes('upload.html')) {
    const uploadForm = document.getElementById('upload-form');
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const category = document.getElementById('product-category').value;
        const imageFile = document.getElementById('product-image').files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const product = {
                name: name,
                price: price,
                category: category,
                image: event.target.result
            };
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));
            alert('產品已成功上架！');
            uploadForm.reset();
        };
        reader.readAsDataURL(imageFile);
    });
}

// 即時搜尋功能
function liveSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTerm = searchInput.value.toLowerCase().trim();

    // 從 localStorage 獲取產品數據
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    // 清空搜尋結果容器
    searchResults.innerHTML = '';

    if (searchTerm === '') {
        // 如果搜尋欄為空,顯示所有產品
        displaySearchResults(products);
        return;
    }

    // 過濾符合搜尋條件的產品
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    // 顯示搜尋結果
    displaySearchResults(filteredProducts);
}

// 顯示搜尋結果
function displaySearchResults(products) {
    const searchResults = document.getElementById('searchResults');
    
    if (products.length === 0) {
        searchResults.innerHTML = '<div class="no-results">找不到符合的產品</div>';
        return;
    }

    // 創建產品卡片並顯示
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>價格: $${product.price}</p>
            <p>類別: ${product.category}</p>
        `;
        searchResults.appendChild(productCard);
    });
}

// 下架產品
function removeProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}


// 頁面加載時顯示產品
window.addEventListener('load', displayProducts);
