import React, { use, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProduct } from "../../features/product/productSlice";

function SectionProducts() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const categoriesToShow = ["beauty", "fragrances", "furniture", "groceries"];



  const loadProduct = useCallback(async () => {
    const data = await dispatch(GetProduct());
    const allProducts = data?.payload?.products || [];
    setProducts(allProducts);
  }, [dispatch]);

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-10">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white">All Categories</h1>
        <p className="text-purple-300 mt-2">
          Explore premium products category-wise
        </p>
        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 mt-4 rounded-full"></div>
      </div>

      {categoriesToShow.map((category, i) => {
        const filteredProducts = products.filter(
          (p) => p.category === category
        );

        return (
          <div key={i} className="mb-20 max-w-7xl mx-auto">
            <h2 className="text-4xl text-center font-bold text-white capitalize mb-6">
              {category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl 
                             shadow-lg border border-purple-500/20 hover:border-purple-500/60 
                             hover:shadow-purple-600/40 transition-all duration-300 hover:-translate-y-2 
                             backdrop-blur-xl overflow-hidden"
                >
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-56 object-cover rounded-t-2xl"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {p.title}
                    </h3>
                    <p className="text-purple-300 text-sm mb-1">{p.brand}</p>

                    <p className="text-slate-300 text-sm line-clamp-2 mb-3">
                      {p.description}
                    </p>

                    <div className="flex justify-between items-center mb-2">
                      <p className="text-amber-400 text-2xl font-bold">
                        ₹{p.price}
                      </p>
                      <p className="text-green-400 font-semibold">
                        {p.discountPercentage}% OFF
                      </p>
                    </div>

                    <p className="text-yellow-400 font-semibold mb-3">
                      {p.rating} ⭐
                    </p>

                    <div className="flex gap-3">
                      <button
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 
                                         hover:from-purple-700 hover:to-pink-700 text-white 
                                         py-2 rounded-lg font-semibold shadow-lg transition-all"
                      >
                        Buy Now
                      </button>

                      <button
                        className="flex-1 bg-slate-800 hover:bg-slate-700 
                                         text-purple-300 hover:text-white border border-purple-500/40 
                                         py-2 rounded-lg font-semibold transition-all"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SectionProducts;
