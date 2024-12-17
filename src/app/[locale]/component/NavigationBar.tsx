"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import "./NavigationBar.css";
import { useRef } from "react";
import LocaleContext from "./LocaleContext";
import fetchData from "@/lib/fetchData";
import { AuthContext } from "@/services/auth/AuthContext";
import Throttle from "@/lib/Throttle";

export default function NavigationBar() {
  const { user } = useContext(AuthContext);
  const { dict } = useContext(LocaleContext);
  // for mobile
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  // for desktop
  const [showLocaleOptions, setShowLocaleOptions] = useState(false);
  // in ms
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = Throttle(() => {
      const currentScrollY = window.scrollY;

      // this if is for handling bumping of safari
      if (currentScrollY > lastScrollY) {
        if (lastScrollY > 0) setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    }, 100); // Adjust throttle delay as needed

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  async function handleAnimation() {
    if (window.innerWidth >= 768) return;
    // Clear any existing timeout to avoid conflicts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isOpen) {
      setHide(false); // Show the menu
      timeoutRef.current = setTimeout(() => setIsOpen(true), 10); // Open the menu after a small delay
    } else {
      setIsOpen(false); // Close the menu
      timeoutRef.current = setTimeout(() => setHide(true), 500); // Hide the menu after 500ms
    }
  }
  /**
   * This is for clicking logo
   */
  async function handleAnimation2() {
    // Clear any existing timeout to avoid conflicts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false); // Close the menu
    timeoutRef.current = setTimeout(() => setHide(true), 500); // Hide the menu after 500ms
  }
  const animationDelayUnit = 35;
  const links = [
    {
      label: dict.header_link_product_inner_text,
      href: "/product?page=1&sort=sold-desc",
      needAuth: false,
    },
    {
      label: dict.header_link_user_inner_text,
      href: "/user",
      needAuth: true,
    },
    {
      label: dict.header_link_cart_inner_text,
      href: "/cart",
      needAuth: true,
    },
    {
      label: dict.header_link_order_inner_text,
      href: "/order",
      needAuth: true,
    },
    {
      label: dict.header_link_login_inner_text,
      href: "/login",
      needAuth: false,
    },
    {
      label: dict.header_link_logout_inner_text,
      href: "/user/logout",
      needAuth: true,
    },
  ];
  return (
    <header
      className={`flex bg-[rgba(128,128,128,0.9)] transform duration-500`}
      style={{
        transform: isHidden ? "translateY(-70px)" : "translateY(0px)",
      }}
    >
      {/*Mobile*/}
      <div
        className="md:hidden"
        style={{
          borderRadius: "100px / 75px",
          overflow: "hidden",
        }}
      >
        <Link onClick={() => handleAnimation2()} href={"/"}>
          <Image
            src="/logo-lg.png"
            width={92}
            height={70}
            alt="e-commerce"
          ></Image>
        </Link>
      </div>

      {!hide && (
        <div
          className={`${
            isOpen ? "opacity-100" : "opacity-0"
          } bg-black/30 top-[70px] left-0 w-full h-[100dvh] fixed ease-in-out duration-300 md:hidden`}
          style={{
            WebkitBackdropFilter: "blur(1px)",
            backdropFilter: "blur(1px)",
            zIndex: 99,
          }}
        >
          <nav
            className={`flex p-5 gap-4 flex-row text-center bg-[#808080d0] fixed left-0 w-full text-white align-middle leading-4`}
          >
            <ul className="flex flex-col w-full items-start gap-2 p-4 bg-gray-600 bg-opacity-80 rounded-lg shadow-lg items-center">
              {links.map((el) => {
                if (
                  el.href == "/product?page=1&sort=sold-desc" ||
                  (!el.needAuth && !user) ||
                  (el.needAuth && user)
                ) {
                  return (
                    <li key={el.label}>
                      <Link
                        onClick={() => handleAnimation()}
                        href={el.href}
                        className="block px-3 py-2"
                        id={
                          el.href === "/product?page=1&sort=sold-desc"
                            ? "product-page-link"
                            : ""
                        }
                      >
                        {el.label}
                      </Link>
                    </li>
                  );
                }
              })}

              <div className="flex gap-3 text-white mt-4">
                <button
                  className="px-3 py-2"
                  onClick={() =>
                    fetchData<null>("/api/user/locale?newLocale=en-US", {
                      method: "put",
                    }).then(() => window.location.reload())
                  }
                >
                  EN
                </button>
                <button
                  className="px-3 py-2"
                  onClick={() =>
                    fetchData<null>("/api/user/locale?newLocale=zh-TW", {
                      method: "put",
                    }).then(() => window.location.reload())
                  }
                >
                  中文
                </button>
              </div>
            </ul>

            {/* Cart Section */}
            {/* <div className="flex grow flex-col items-end p-4 bg-gray-600 bg-opacity-80 rounded-lg shadow-lg mr-4">
              <CartItemList onClickingLinksInCartItemList={handleAnimation} />
            </div> */}
          </nav>
        </div>
      )}
      <button
        onClick={() => handleAnimation()}
        className="mobile-menu-button ml-auto md:hidden"
      >
        <div className={`${isOpen && "menu-open"}`}></div>
      </button>

      {/* Desktop */}
      <nav
        className={`hidden text-white md:leading-header-line md:text-center md:flex md:flex-row md:gap-4 md:mt-0 md:w-full md:h-auto md:z-auto md:p-0 md:bg-transparent md:opacity-100 md:mx-auto md:max-w-[1200px]`}
      >
        <div
          className="mr-auto"
          style={{
            borderRadius: "100px / 75px",
            overflow: "hidden",
          }}
        >
          <Link onClick={() => handleAnimation2()} href={"/"}>
            <Image
              src="/logo-lg.png"
              width={92}
              height={70}
              alt="e-commerce"
            ></Image>
          </Link>
        </div>
        <Link
          style={{
            transform: isOpen ? "translateX(0px)" : "translateX(-10px)",
            transition: "0.5s",
            transitionDelay: isOpen
              ? `${0 * animationDelayUnit}ms`
              : `${6 * animationDelayUnit}ms`,
          }}
          onClick={() => handleAnimation()}
          href={"/product?page=1&sort=sold-desc"}
          id="product-page-link"
        >
          {dict.header_link_product_inner_text}
        </Link>
        {user && (
          <>
            <Link
              style={{
                transform: isOpen ? "translateX(0px)" : "translateX(-10px)",
                transition: "0.5s",
                transitionDelay: isOpen
                  ? `${1 * animationDelayUnit}ms`
                  : `${5 * animationDelayUnit}ms`,
              }}
              onClick={() => handleAnimation()}
              href={"/user"}
            >
              {dict.header_link_user_inner_text}
            </Link>
            <Link
              style={{
                transform: isOpen ? "translateX(0px)" : "translateX(-10px)",
                transition: "0.5s",
                transitionDelay: isOpen
                  ? `${3 * animationDelayUnit}ms`
                  : `${3 * animationDelayUnit}ms`,
              }}
              onClick={() => handleAnimation()}
              href={"/cart"}
            >
              {dict.header_link_cart_inner_text}
            </Link>
            <Link
              style={{
                transform: isOpen ? "translateX(0px)" : "translateX(-10px)",
                transition: "0.5s",
                transitionDelay: isOpen
                  ? `${3 * animationDelayUnit}ms`
                  : `${3 * animationDelayUnit}ms`,
              }}
              onClick={() => handleAnimation()}
              href={"/order"}
            >
              {dict.header_link_order_inner_text}
            </Link>
            <Link
              style={{
                transform: isOpen ? "translateX(0px)" : "translateX(-10px)",
                transition: "0.5s",
                transitionDelay: isOpen
                  ? `${3 * animationDelayUnit}ms`
                  : `${3 * animationDelayUnit}ms`,
              }}
              onClick={() => handleAnimation()}
              href={"/user/logout"}
            >
              {dict.header_link_logout_inner_text}
            </Link>
          </>
        )}
        {!user && (
          <Link
            style={{
              transform: isOpen ? "translateX(0px)" : "translateX(-10px)",
              transition: "0.5s",
              transitionDelay: isOpen
                ? `${4 * animationDelayUnit}ms`
                : `${2 * animationDelayUnit}ms`,
            }}
            onClick={() => handleAnimation()}
            href={"/login"}
          >
            {dict.header_link_login_inner_text}
          </Link>
        )}
        {/* <div className="hidden md:hidden">
          <CartItemList onClickingLinksInCartItemList={handleAnimation} />
        </div> */}
        <div
          className="md:items-center hidden md:flex relative"
          onMouseEnter={() => setShowLocaleOptions(true)}
          onMouseLeave={() => setShowLocaleOptions(false)}
        >
          <Image src="/locale.svg" width={26} height={26} alt="locales"></Image>
          {showLocaleOptions && (
            <div className="absolute top-[70px] -right-4 flex flex-col bg-white shadow-lg rounded-lg border text-black dark:bg-gray-600 dark:text-white min-w-[6rem] overflow-hidden">
              <button
                className="p-1 hover:underline"
                onClick={() =>
                  fetchData<null>("/api/user/locale?newLocale=en-US", {
                    method: "put",
                  }).then(() => window.location.reload())
                }
              >
                EN
              </button>
              <button
                className="p-1 hover:underline"
                onClick={() =>
                  fetchData<null>("/api/user/locale?newLocale=zh-TW", {
                    method: "put",
                  }).then(() => window.location.reload())
                }
              >
                中文
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
