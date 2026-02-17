import Navbar from "../components/organism/Navbar";
import AuthLayout from "../components/layout/AuthLayout";
import FormLogin from "../components/Molecules/FormLogin";

const Login = () => {

  return (
    <>
      <Navbar />
      <AuthLayout
        title="Masuk ke Akun"
        subtitle="Yuk, lanjutin belajarmu di videobelajar."
      >
        <FormLogin />
      </AuthLayout>
    </>
  );
};

export default Login;
