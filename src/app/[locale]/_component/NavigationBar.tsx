"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import "./NavigationBar.css";
import CartItemList from "@/app/[locale]/_component/CartItemList";
import { useRef } from "react";
import LocaleContext from "./LocaleContext";
function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export default function NavigationBar({ loggedIn }: { loggedIn: boolean }) {
  const dict = useContext(LocaleContext);
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
    const handleScroll = throttle(() => {
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
    // if (window.innerWidth >= 768) return;
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
  return (
    <header
      className={`flex bg-[rgba(128,128,128,0.9)] transform duration-500`}
      style={{
        transform: isHidden ? "translateY(-70px)" : "translateY(0px)",
      }}
    >
      {/*Mobile*/}
      <div
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
          } bg-black/30 top-[70px] left-0 w-[100dvw] h-[100dvh] fixed ease-in-out duration-300`}
          style={{
            WebkitBackdropFilter: "blur(1px)",
            backdropFilter: "blur(1px)",
            zIndex: 99,
          }}
        >
          <nav
            className={`flex p-5 gap-4 flex-row w-full mt-[0] text-center bg-[#808080d0] fixed left-0 w-[100dvw] text-white align-middle leading-4 m-0`}
          >
            <ul className="flex flex-col items-start gap-2 w-33 p-4 bg-gray-600 bg-opacity-80 rounded-lg shadow-lg">
              <li
                style={{
                  transform: isOpen ? "translateX(0px)" : "translateX(-10px)",
                  transition: "0.5s",
                  transitionDelay: isOpen
                    ? `${0 * animationDelayUnit}ms`
                    : `${5 * animationDelayUnit}ms`,
                }}
              >
                <Link
                  onClick={() => handleAnimation()}
                  href={"/product?page=1&sort=sold-desc"}
                  className="block px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                  id="product-page-link"
                >
                  Product
                </Link>
              </li>
              {loggedIn && (
                <>
                  <li
                    style={{
                      transform: isOpen
                        ? "translateX(0px)"
                        : "translateX(-10px)",
                      transition: "0.5s",
                      transitionDelay: isOpen
                        ? `${1 * animationDelayUnit}ms`
                        : `${4 * animationDelayUnit}ms`,
                    }}
                  >
                    <Link
                      onClick={() => handleAnimation()}
                      href={"/user"}
                      className="block px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                    >
                      User
                    </Link>
                  </li>
                  <li
                    style={{
                      transform: isOpen
                        ? "translateX(0px)"
                        : "translateX(-10px)",
                      transition: "0.5s",
                      transitionDelay: isOpen
                        ? `${2 * animationDelayUnit}ms`
                        : `${3 * animationDelayUnit}ms`,
                    }}
                  >
                    <Link
                      onClick={() => handleAnimation()}
                      href={"/order"}
                      className="block px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                    >
                      Order
                    </Link>
                  </li>
                  <li
                    style={{
                      transform: isOpen
                        ? "translateX(0px)"
                        : "translateX(-10px)",
                      transition: "0.5s",
                      transitionDelay: isOpen
                        ? `${3 * animationDelayUnit}ms`
                        : `${2 * animationDelayUnit}ms`,
                    }}
                  >
                    <Link
                      onClick={() => handleAnimation()}
                      href={"/user/logout"}
                      className="block px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
              {!loggedIn && (
                <li
                  style={{
                    transform: isOpen ? "translateX(0px)" : "translateX(-10px)",
                    transition: "0.5s",
                    transitionDelay: isOpen
                      ? `${0 * animationDelayUnit}ms`
                      : `${1 * animationDelayUnit}ms`,
                  }}
                >
                  <Link
                    onClick={() => handleAnimation()}
                    href={"/login"}
                    className="block px-3 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
                  >
                    {dict.user_login}
                  </Link>
                </li>
              )}
              <div
                className="flex gap-3 text-white mt-4"
                style={{
                  transform: isOpen ? "translateX(0px)" : "translateX(-10px)",
                  transition: "0.5s",
                  transitionDelay: "0.1s",
                }}
              >
                <button
                  className="px-3 py-2 rounded-lg bg-gray-600 shadow-lg transition"
                  onClick={() =>
                    fetch("/api/user/locale?newLocale=en-US", {
                      method: "put",
                    }).then(() => window.location.reload())
                  }
                >
                  EN
                </button>
                <button
                  className="px-3 py-2 rounded-lg bg-gray-600 shadow-lg transition"
                  onClick={() =>
                    fetch("/api/user/locale?newLocale=zh-TW", {
                      method: "put",
                    }).then(() => window.location.reload())
                  }
                >
                  中文
                </button>
              </div>
            </ul>

            {/* Cart Section */}
            <div className="flex grow flex-col items-end p-4 bg-gray-600 bg-opacity-80 rounded-lg shadow-lg mr-4">
              <CartItemList onClickingLinksInCartItemList={handleAnimation} />
            </div>
          </nav>
        </div>
      )}
      <button
        onClick={() => handleAnimation()}
        className="mobile-menu-button ml-auto"
      >
        <div className={`${isOpen && "menu-open"}`}></div>
      </button>

      {/* Desktop */}
      <nav
        className={`hidden text-white md:leading-header-line md:text-center md:static md:flex md:flex-row md:gap-4 md:ml-auto md:mr-0 md:mt-0 md:w-auto md:h-auto md:z-auto md:p-0 md:bg-transparent md:opacity-100  md:hidden`}
      >
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
          Product
        </Link>
        {loggedIn && (
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
              User
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
              Logout
            </Link>
          </>
        )}
        {!loggedIn && (
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
            Login
          </Link>
        )}
        <div className="hidden md:hidden">
          <CartItemList onClickingLinksInCartItemList={handleAnimation} />
        </div>
        <div
          className="md:items-center hidden md:flex"
          onMouseEnter={() => setShowLocaleOptions(true)}
          onMouseLeave={() => setShowLocaleOptions(false)}
        >
          <Image src="/locale.svg" width={26} height={26} alt="locales"></Image>
          {showLocaleOptions && (
            <div className="absolute top-[70px] right-[-5px] flex flex-col bg-white shadow-lg rounded-lg border text-black dark:bg-black dark:text-white  min-w-[6rem] overflow-hidden">
              <button
                className="p-1 hover:underline"
                onClick={() =>
                  fetch("/api/user/locale?newLocale=en-US", {
                    method: "put",
                  }).then(() => window.location.reload())
                }
              >
                EN
              </button>
              <button
                className="p-1 hover:underline"
                onClick={() =>
                  fetch("/api/user/locale?newLocale=zh-TW", {
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
