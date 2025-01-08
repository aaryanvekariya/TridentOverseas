document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

// Load categories and items from JSON
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const categories = data.categories;

        // Populate category buttons dynamically
        const categoryList = document.querySelector('.category-list');
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.classList.add('category-btn');
            button.onclick = function () { toggleCategory(category.id); };
            categoryList.appendChild(button);

            // Populate category items
            const itemsDisplay = document.querySelector('.items-display');
            const categoryItems = document.createElement('div');
            categoryItems.classList.add('category-items');
            categoryItems.id = category.id;
            categoryItems.style.display = 'none'; // Start with category hidden

            category.items.forEach(item => {
                const itemBox = document.createElement('div');
                itemBox.classList.add('item-box');

                const img = document.createElement('img');
                img.src = item.image;
                img.alt = `${item.name} Image`;
                itemBox.appendChild(img);

                const name = document.createElement('h4');
                name.textContent = item.name;
                itemBox.appendChild(name);

                const button = document.createElement('button');
                button.textContent = 'Order Now';
                button.classList.add('order-btn');
                button.onclick = function () {
                    window.location.href = 'order.html';
                };
                itemBox.appendChild(button);

                categoryItems.appendChild(itemBox);
            });

            // Add close button at the bottom of the category items
            const closeButton = document.createElement('button');
            closeButton.textContent = 'Close Category';
            closeButton.className = 'close-category';
            closeButton.onclick = function () {
                closeCategory(category.id);
            };

            categoryItems.appendChild(closeButton);
            itemsDisplay.appendChild(categoryItems);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

// Function to toggle category visibility (open/close)
function toggleCategory(category) {
    const categoryItems = document.getElementById(category);

    if (categoryItems) {
        // Check if the clicked category is currently visible
        const isVisible = categoryItems.style.display === 'flex';

        // Hide all categories
        const allCategories = document.querySelectorAll('.category-items');
        allCategories.forEach(cat => cat.style.display = 'none');

        // Show or hide the clicked category based on its current state
        categoryItems.style.display = isVisible ? 'none' : 'flex';
    }
}

// Function to close the category section explicitly
function closeCategory(category) {
    const categoryItems = document.getElementById(category);
    if (categoryItems) {
        categoryItems.style.display = 'none'; // Hide category section
    }
}

// Call the adjustItemsLayout function on page load to ensure proper layout
window.onload = function() {
    adjustItemsLayout();
};


    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Here you would typically send the form data to a server
        console.log('Contact form submitted:', { name, email, message });

        // Show a success message
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
});
