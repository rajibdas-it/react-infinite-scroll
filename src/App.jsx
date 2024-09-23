import React from "react";

import Header from "./components/Hader/Header";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <ProductList />
    </div>
  );
};

export default App;
