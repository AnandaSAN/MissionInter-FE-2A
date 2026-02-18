import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PopupEdit from "../components/molecules/FormEditProduct";

const Product = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("courses");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    teacher: "",
    job: "",
    category: "",
    img: "",
    price: "",
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setIsEdit(false);
    setFormData({
      id: null,
      title: "",
      teacher: "",
      job: "",
      category: "",
      img: "",
      price: "",
    });
    setIsPopupOpen(true);
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setFormData(product);
    setIsPopupOpen(true);
  };

  const handleSave = () => {
    if (
      !formData.title ||
      !formData.teacher ||
      !formData.category ||
      !formData.price ||
      !formData.job
    ) {
      alert("Mohon lengkapi semua field yang diperlukan.");
      return;
    }

    if (formData.price <= 0) {
      alert("Harga harus lebih besar dari 0.");
      return;
    }

    if (isEdit) {
      const UpdatedProduct = products.map((item) => {
        return item.id === formData.id ? formData : item;
      });
      setProducts(UpdatedProduct);
      alert("Produk berhasil diperbarui!");
    } else {
      if (!formData.img) {
        formData.img = "https://picsum.photos/600/400?random";
      }
      const newProduct = {
        ...formData,
        id: Date.now(),
      };
      setProducts([...products, newProduct]);
      alert("Produk berhasil ditambahkan!");
    }

    setIsPopupOpen(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin ingin menghapus produk ini?",
    );
    if (!confirmDelete) return;

    const Delete = products.filter((item) => item.id !== id);
    setProducts(Delete);
  };

  return (
    <>
      <div className="bg-white rounded-xl p-5 border border-[#3A35411F] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="font-poppins font-semibold text-xl ">{`Daftar Produk (${products.length})`}</h2>
          <button
            onClick={handleAdd}
            className="w-fit bg-green-500 text-white px-4 py-2 text-sm rounded hover:bg-green-600 mt-2"
          >
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
              {currentProducts.map((product, index) => (
                <tr key={product.id}>
                  <td className="py-2 px-4">{indexOfFirstItem + index + 1}</td>
                  <td className="py-2 px-4 text-sm text-gray-600 font-semibold">
                    {product.title}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap text-sm text-gray-600">
                    <p className="font-bold">{product.teacher}</p>
                    <p>{product.job}</p>
                  </td>
                  <td className="py-2 px-4 font-medium text-sm text-gray-600">
                    {product.category}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    Rp {new Intl.NumberFormat("id-ID").format(product.price)}
                  </td>
                  <td className="py-2 px-4 gap-2 whitespace-nowrap text-sm font-medium text-center">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-200 text-blue-600 px-3 py-1 rounded hover:bg-blue-400 hover:text-blue-900 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-200 text-red-600 px-3 py-1 rounded ml-2 hover:bg-red-400 hover:text-red-900 cursor-pointer"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center items-center gap-2 mt-5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              next
            </button>
          </div>
        </div>
      </div>

      <PopupEdit
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSave}
        formData={formData}
        handleChange={handleChange}
        isEdit={isEdit}
      />
    </>
  );
};

export default Product;
