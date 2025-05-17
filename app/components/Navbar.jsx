import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

const MyLink = forwardRef((props, ref) => {
  let { href, children, ...rest } = props;
  return (
    <Link
      className="block data-focus:bg-blue-100"
      href={href}
      ref={ref}
      {...rest}
    >
      {children}
    </Link>
  );
});

const authlinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];
const userlinks = [
  { href: "/profile", label: "Profile" },
  { href: "/bookmarks", label: "Bookmarks" },
];
const Navbar = () => {
  function showLogoutDialog() {
    alert("Open logout dialog!");
  }
  return (
    <header>
      <nav>
        <div className="logo">
          <MyLink href="/">
            <Image
              priority="high"
              className="logoimage"
              src="/logo.webp"
              alt="logo"
              width={60}
              height={30}
            />
          </MyLink>
        </div>
        <Menu>
          {({ open }) => (
            <>
              <MenuItem>
                <Link href="/home">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/about">About</Link>
              </MenuItem>
              <MenuButton>Authentication</MenuButton>
              <AnimatePresence>
                {open && (
                  <MenuItems
                    static
                    as={motion.div}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    anchor="bottom"
                    className="w-(--button-width) origin-top"
                  >
                    <MenuSection>
                      <MenuHeading className="mb-2 text-sm opacity-50">
                        Login or Register
                      </MenuHeading>
                      {authlinks.map((authlink) => (
                        <MenuItem key={authlink.href}>
                          <MyLink href={authlink.href}>{authlink.label}</MyLink>
                        </MenuItem>
                      ))}
                    </MenuSection>
                  </MenuItems>
                )}
              </AnimatePresence>
              {/* <MenuButton>User</MenuButton>
              <AnimatePresence>
                {open && (
                  <MenuItems
                    static
                    as={motion.div}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    anchor="bottom"
                    className="w-(--button-width) origin-top"
                  >
                    <MenuSection>
                      <MenuHeading className="text-sm opacity-50">
                        UserName
                      </MenuHeading>
                      {userlinks.map((userlink) => (
                        <MenuItem key={userlink.href}>
                          <MyLink href={userlink.href}>{userlink.label}</MyLink>
                        </MenuItem>
                      ))}
                    </MenuSection>
                    <MenuSeparator className="my-1 h-px bg-black" />
                    <MenuItem>
                      <button
                        onClick={showLogoutDialog}
                        type="submit"
                        className="block w-full text-left data-focus:bg-blue-100"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                )}
              </AnimatePresence> */}
            </>
          )}
        </Menu>
      </nav>
    </header>
  );
};

export default Navbar;
