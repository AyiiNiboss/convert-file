import Footer from "../container/footer";
import Header from "../container/header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
        <main className="flex justify-center min-h-screen bg-slate-300">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
