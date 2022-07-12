import Link from "next/link";
import { BiChevronsRight } from "react-icons/bi";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div data-theme="garden"> 
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button"
          >
            <BiChevronsRight />
          </label>
          <main>{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <Link href="/auth/signin">
              <a className="btn m-1">Voter Details</a>
            </Link>
            <Link href="/auth/signup">
              <a className="btn m-1">signup</a>
            </Link>
            <Link href="/auth/signin">
              <a className="btn m-1">signin</a>
            </Link>
            <Link href="/auth/signin">
              <a className="btn m-1">Candidates</a>
            </Link>
            <Link href="/auth/signin">
              <a className="btn m-1">Vie for position</a>
            </Link>
            
            <Link href="/auth/signin">
              <a className="btn m-1">Vote</a>
            </Link>

            <a
              className="btn"
              onClick={() => {
                sessionStorage.clear();
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
