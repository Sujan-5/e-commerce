import items from "./Items";

function App() {
  return (
    <div>
      <header>
        <a href="/">
          <span>City</span> Wide
        </a>
      </header>
      <main>
        <h1>Products</h1>
        <div className="products">
          {items.products.map((product) => (
            <div key={product.slug} className="product">
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
