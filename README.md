Homework 1 for Hunter Web Dev
Create a simple restaurant website with a menu, gallery, and contact page.

Homework 2: Implementing a Shopping Cart Feature
    Add Items to the Cart – When a user clicks on a food item in the menu, it should be added to their shopping cart.(10 points)
    View the Cart – The shopping cart should display the selected items, including their names, prices, and quantities. (10 points)
    Remove Items from the Cart – Users should be able to remove items from the shopping cart if they change their minds.(10 points)
    Ensure that the cart dynamically updates as users add or remove items. You may use JavaScript, HTML, and CSS to implement this feature. Bonus points for adding a cart total price calculation and a clear cart option. (10 points)

React Conversion
---------------
This repository has been converted to a React app (Vite). A new `src/` folder contains React components and pages. The original static site files are preserved under `legacy/`.

Quick start
1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Open the dev URL shown by Vite (usually `http://localhost:5173`)

Notes
- The app uses Bootstrap for styling and imports the original `css/style.css` for custom styles.
- Cart state is implemented in `src/context/CartContext.jsx` and visible via the cart button in the header.
- If you want the original static site back, see the files in `legacy/` or at the repository root.
