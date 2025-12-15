import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <section className="w-full h-[95vh] bg-gradient-to-br from-purple-700/30 to-pink-600/20 backdrop-blur-xl flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-7xl md:text-8xl font-extrabold text-white drop-shadow-2xl mb-8">
          Welcome to Our Mega Store
        </h1>
        <p className="text-purple-200 text-2xl md:text-3xl max-w-4xl">
          Experience premium shopping, unbeatable deals, exclusive categories, and top-rated products.
        </p>

        <button className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 px-14 py-5 text-2xl text-white font-semibold rounded-2xl hover:scale-110 transition-all shadow-2xl">
          Shop Now
        </button>
      </section>

      <section className="max-w-7xl mx-auto py-24 px-6">
        <h2 className="text-6xl font-bold text-white text-center mb-20">Featured Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {["Beauty", "Fragrances", "Furniture", "Groceries", "Electronics", "Fashion", "Sports", "Accessories"].map((category, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 shadow-2xl rounded-2xl p-10 text-center hover:scale-110 hover:border-purple-500/60 transition-all"
            >
              <h3 className="text-4xl text-white font-bold mb-3">{category}</h3>
              <p className="text-purple-300 text-lg">Explore the best collections in {category}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-20 shadow-2xl text-center hover:scale-[1.02] transition-all">
          <h2 className="text-6xl text-white font-extrabold mb-8">Big Deals of the Day</h2>
          <p className="text-purple-100 text-2xl max-w-3xl mx-auto mb-12">
            Get massive discounts on top products. Limited-time deals — hurry before they end!
          </p>

          <button className="bg-white text-purple-700 px-14 py-5 text-2xl font-semibold rounded-xl hover:bg-purple-200 transition-all shadow-xl">
            View Deals
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-6xl font-bold text-white text-center mb-20">Trending Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {[1,2,3,4,5,6].map((item) => (
            <div
              key={item}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/30 shadow-xl rounded-2xl p-10 hover:scale-105 transition-all"
            >
              <div className="bg-slate-700 rounded-xl h-56 mb-8"></div>
              <h3 className="text-3xl font-semibold text-white mb-3">Product Title {item}</h3>
              <p className="text-purple-300 text-lg mb-6">Amazing description for product {item}.</p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 w-full py-4 text-xl text-white font-semibold rounded-lg hover:scale-105 transition-all">
                View Product
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-6xl font-bold text-white text-center mb-20">Why Shop With Us?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            "Fast Delivery",
            "Secure Payments",
            "Top Quality Products",
            "24/7 Customer Support"
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-slate-800/60 p-10 rounded-2xl border border-purple-500/40 shadow-xl hover:scale-105 transition-all text-center"
            >
              <h3 className="text-3xl text-white font-bold mb-4">{benefit}</h3>
              <p className="text-purple-300 text-lg">Enjoy the advantages of premium shopping.</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-16 mt-20 bg-gradient-to-r from-slate-900 to-purple-900 text-center text-purple-300">
        <p className="text-2xl">© 2025 Your Mega Store — All Rights Reserved</p>
      </footer>

    </div>
  );
}

export default Home;
