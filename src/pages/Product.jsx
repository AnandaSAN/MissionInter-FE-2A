import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("courses");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="bg-white rounded-xl p-5 border border-[#3A35411F] shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h2 className="font-poppins font-semibold text-xl ">{`Daftar Produk (${products.length})`}</h2>
        <button className="w-fit bg-green-500 text-white px-4 py-2 text-sm rounded hover:bg-green-600 mt-2">
          Tambah Produk
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="font-dm-sans font-semibold text-gray-700 bg-gray-100">
            <tr>
              <th className="text-left py-2 px-4">NO</th>
              <th className="text-left py-2 px-4">Nama Produk</th>
              <th className="text-left py-2 px-4">mentor</th>
              <th className="text-left py-2 px-4">Kategori</th>
              <th className="text-left py-2 px-4">Harga</th>
              <th className="text-left py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 text-sm text-gray-600 font-semibold">{product.title}</td>
                <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-600">
                  <p className="font-bold">{product.teacher}</p>
                  <p>{product.job}</p>
                </td>
                <td className="py-2 px-4 whitespace-nowrap font-medium text-sm text-gray-600">
                  {product.category}
                </td>
                <td className="py-2 px-4 whitespace-nowrap text-sm font-semibold text-green-600">
                  Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                </td>
                <td className="py-2 px-4 gap-2 whitespace-nowrap text-sm font-medium text-center">
                  <button className="bg-blue-200 text-blue-600 px-3 py-1 rounded hover:bg-blue-400 hover:text-blue-900 cursor-pointer">
                    Edit
                  </button>
                  <button className="bg-red-200 text-red-600 px-3 py-1 rounded ml-2 hover:bg-red-400 hover:text-red-900 cursor-pointer">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
