import Link from "next/link";
import { useRouter } from "next/router";
import { BiChevronsRight } from "react-icons/bi";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <div data-theme="garden">
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            <BiChevronsRight />
          </label>
          <main>{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <Link href="/">
              <a className="btn m-1">Voter and Candidate Details</a>
            </Link>
            <Link href="/elections">
              <a className="btn m-1">Elections</a>
            </Link>
            <Link href="/vote">
              <a className="btn m-1">Candidates</a>
            </Link>
            <Link href="/admin">
              <a className="btn m-1">Admin panel</a>
            </Link>
            <Link
              href="/auth/signup"
              onClick={() => {
                localStorage.removeItem("voterId");
              }}
            >
              <a className="btn m-1">signup</a>
            </Link>
            <Link
              href="/auth/signin"
              onClick={() => {
                localStorage.removeItem("voterId");
              }}
            >
              <a className="btn m-1">signin</a>
            </Link>
            <a
              className="btn"
              onClick={() => {
                sessionStorage.clear();
                localStorage.removeItem("voterId");
                router.push("/auth/signin");
              }}
            >
              logout
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Layout;
