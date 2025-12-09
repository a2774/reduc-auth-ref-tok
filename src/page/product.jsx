import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { GetProduct } from "../feature/user/userSlice";

function Product() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const GetAllProduct = useCallback(async () => {
    const data = await dispatch(GetProduct());
    setProducts(data?.payload?.products || []);
  }, [dispatch]);

  useEffect(() => {
    GetAllProduct();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return products.slice(start, end);
  }, [page, products]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback((num) => {
    setPage(num);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Products</h1>
        <p className="text-purple-300 text-lg">Explore our premium collection</p>
        <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.length === 0 && (
          <p className="text-center text-purple-300 text-xl col-span-full">Loading...</p>
        )}

        {paginatedProducts.map((p) => (
          <div
            key={p.id}
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl shadow-lg border border-purple-500/20 hover:border-purple-500/60 hover:shadow-purple-600/40 transition-all duration-300 overflow-hidden hover:-translate-y-2"
          >
            <img src={p.thumbnail} alt={p.title} className="w-full h-56 object-cover rounded-t-2xl" />

            <div className="p-5">
              <h2 className="text-xl font-bold text-white mb-2">{p.title}</h2>
              <p className="text-purple-300 text-sm mb-1">{p.brand}</p>
              <p className="text-slate-400 text-xs mb-3 uppercase">{p.category}</p>

              <div className="flex justify-between items-center mb-4">
                <p className="text-amber-400 text-2xl font-bold">₹{p.price}</p>
                <p className="text-green-400 font-semibold">{p.discountPercentage}% OFF</p>
              </div>

              <div className="flex justify-between mb-3">
                <span className="text-yellow-400 font-semibold">{p.rating} ⭐</span>
                <span className="text-purple-300 text-sm">{p.availabilityStatus}</span>
              </div>

              <p className="text-slate-300 text-sm line-clamp-2 mb-4">{p.description}</p>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 rounded-lg font-semibold shadow-lg transition-all">
                  Buy Now
                </button>

                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-purple-300 hover:text-white border border-purple-500/40 py-2 rounded-lg font-semibold transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10 space-x-3">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-600"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={`px-4 py-2 rounded-lg ${
              num === page ? "bg-pink-500 text-white" : "bg-slate-800 text-purple-300"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Product;
