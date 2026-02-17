import LogoMata from "../../assets/images/Mata.png";
import LogoGoogle from "../../assets/images/LogoGoogle.png";
import Bendera from "../../assets/images/Indonesia.png";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../atom/Button";

const FormRegister = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nama: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const HandleSubmit = (e) => {
    e.preventDefault();

    if(!user.nama || !user.email || !user.phone || !user.password || !user.confirmPassword) {
      alert("Semua Input harus diisi!");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = userData.find((users) => users.email === user.email);

    if (existingUser) {
      alert("Email sudah terdaftar!");
      return;
    }

    const newUser = {
      id: Date.now(),
      nama: user.nama,
      email: user.email,
      phone: user.phone,
      password: user.password,
    };

    localStorage.setItem("users", JSON.stringify([...userData, newUser]));

    alert("Registrasi berhasil! Silakan login dengan akun Anda.");
    navigate("/login");
  };

  return (
    <form className="space-y-4" onSubmit={HandleSubmit}>
      <div className="flex flex-col space-y-1">
        <label className="text-sm md:text-[16px] font-regular text-[#4A505C]">
          Nama Lengkap <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full border border-[#3A35411F] rounded-md p-3"
          type="text"
          placeholder=""
          value={user.nama}
          onChange={(e) => setUser({ ...user, nama: e.target.value })}
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm md:text-[16px] font-regular text-[#4A505C]">
          E-Mail <span className="text-red-600">*</span>
        </label>
        <input
          className="w-full border border-[#3A35411F] rounded-md p-3"
          type="email"
          placeholder=""
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="phone"
          className="text-sm md:text-[16px] font-regular text-[#4A505C]"
        >
          No. Hp <span className="text-red-600">*</span>
        </label>

        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#f0f0f0] flex items-center justify-center border border-[#3a35411f] rounded-l-md">
            <img src={Bendera} alt="Indonesia" className="w-6 h-6" />
          </div>
          <select
            name="kode"
            className="h-12 px-2 text-sm md:text-[16px] bg-white border border-[#3A35411F] rounded-r-lg focus:ring-1 focus:ring-zinc-800 outline-none"
            
          >
            <option value="+62">+62</option>
          </select>
          <input
            className="flex-1 w-full h-12 px-3 ml-2 border border-[#3a35411f] rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
            type="tel"
            id="phone"
            name="phone"
            placeholder=""
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-1 relative">
        <label className="text-sm md:text-[16px] font-regular text-[#4A505C]">
          Kata Sandi <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            className="w-full border border-[#3A35411F] rounded-md p-3 pr-10"
            type="password"
            placeholder=""
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <img
            src={LogoMata}
            alt="mata"
            className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-1 relative">
        <label className="text-sm md:text-[16px] font-regular text-[#4A505C]">
          Konfirmasi Kata Sandi <span className="text-red-600">*</span>
        </label>
        <div className="relative">
          <input
            className="w-full border border-[#3A35411F] rounded-md p-3 pr-10"
            type="password"
            placeholder=""
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          <img
            src={LogoMata}
            alt="mata"
            className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2 hover:cursor-pointer"
          />
        </div>
      </div>

      <div className="text-right">
        <Link
          to="#"
          className="text-sm md:text-[16px] font-medium text-[#333333AD] hover:underline"
        >
          Lupa Password?
        </Link>
      </div>

      <Button variant="primary" type="submit">
        Daftar
      </Button>
      <Button variant="secondary" type="button" onClick={() => navigate("/login")}>
        Masuk
      </Button>
      <div className="flex items-center my-6">
        <div className="grow border-b border-[#ccc]" />
        <span className="mx-2 text-[#333333ad] text-sm md:text-[16px]">
          atau
        </span>
        <div className=" grow border-b border-[#ccc]" />
      </div>

      <Button variant="others">
        <img
          src={LogoGoogle}
          alt="google"
          className="w-5 h-5 mr-2 inline-block"
        />{" "}
        Masuk dengan Google
      </Button>
    </form>
  );
};

export default FormRegister;
