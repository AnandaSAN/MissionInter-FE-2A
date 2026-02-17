import { useState } from "react";
import { Link, useNavigate } from "react-router";
import LogoMata from "../../assets/images/Mata.png";
import LogoGoogle from "../../assets/images/LogoGoogle.png";

import Button from "../atom/Button";

const FormLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("Semua Input harus diisi!");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = userData.find(
      (users) => users.email === user.email && users.password === user.password,
    );

    if (existingUser) {
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      alert("Login berhasil! Selamat datang, " + existingUser.nama);
      navigate("/");
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <form className="space-y-4" onSubmit={HandleSubmit}>
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

      <div className="flex flex-col space-y-1 relative">
        <label className="text-sm md:text-[16px] font-regular text-[#4A505C]">
          Password <span className="text-red-600">*</span>
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

      <div className="text-right">
        <Link
          to="#"
          className="text-sm md:text-[16px] font-medium text-[#333333AD] hover:underline"
        >
          Lupa Password?
        </Link>
      </div>

      <Button type="submit" variant="primary">
        Masuk
      </Button>

      <Button
        type="button"
        variant="secondary"
        onClick={() => navigate("/register")}
      >
        Daftar
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

export default FormLogin;
