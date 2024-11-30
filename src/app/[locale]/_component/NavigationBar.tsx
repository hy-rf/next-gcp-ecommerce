"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./NavigationBar.css";
import CartItemList from "@/app/[locale]/_component/CartItemList";

export default function NavigationBar({ loggedIn }: { loggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showLocaleOptions, setShowLocaleOptions] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setIsAnimated(false);
    }
  }, [isOpen]);
  // in ms
  const animationDelayUnit = 45;
  return (
    <>
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } ${isAnimated ? "opacity-100" : "opacity-0"} p-10 gap-3 z-40 flex-col ml-o mt-[70px] text-center bg-[#808080d0] fixed left-0 color:white w-[100dvw] h-[100dvh] no-underline text-white align-middle leading-4 md:leading-header-line md:text-center md:static md:flex md:flex-row md:gap-4 md:ml-auto md:mr-0 md:mt-0 md:w-auto md:h-auto md:z-auto md:p-0 md:bg-transparent transform ease-in-out duration-500 md:opacity-100`}
      >
        <Link
          style={{
            transform: isAnimated ? "translateX(0px)" : "translateX(-10px)",
            transition: "0.5s",
            transitionDelay: isOpen
              ? `${0 * animationDelayUnit}ms`
              : `${6 * animationDelayUnit}ms`,
          }}
          onClick={() => setIsOpen(false)}
          href={"/product"}
        >
          Product
        </Link>
        {loggedIn && (
          <>
            <Link
              style={{
                transform: isAnimated ? "translateX(0px)" : "translateX(-10px)",
                transition: "0.5s",
                transitionDelay: isOpen
                  ? `${1 * animationDelayUnit}ms`
                  : `${5 * animationDelayUnit}ms`,
              }}
              onClick={() => setIsOpen(false)}
              href={"/user"}
            >
              User
            </Link>
            <Link
              style={{
                transform: isAnimated ? "translateX(0px)" : "translateX(-10px)",
                transition: "0.5s",
                transitionDelay: isOpen
                  ? `${3 * animationDelayUnit}ms`
                  : `${3 * animationDelayUnit}ms`,
              }}
              onClick={() => setIsOpen(false)}
              href={"/user/logout"}
            >
              Logout
            </Link>
          </>
        )}
        {!loggedIn && (
          <Link
            style={{
              transform: isAnimated ? "translateX(0px)" : "translateX(-10px)",
              transition: "0.5s",
              transitionDelay: isOpen
                ? `${4 * animationDelayUnit}ms`
                : `${2 * animationDelayUnit}ms`,
            }}
            onClick={() => setIsOpen(false)}
            href={"/user/login"}
          >
            Login
          </Link>
        )}
        <CartItemList />
        <div
          className="md:items-center hidden md:flex"
          onMouseEnter={() => setShowLocaleOptions(true)}
          onMouseLeave={() => setShowLocaleOptions(false)}
        >
          <Image src="/locale.svg" width={26} height={26} alt="locales"></Image>
          {showLocaleOptions && (
            <div className="absolute top-[70px] right-0 flex flex-col bg-gray-800 text-white rounded-md shadow-md min-w-[6rem] overflow-hidden">
              <button
                className="px-4 py-2 hover:bg-gray-700 transition-colors"
                onClick={() =>
                  fetch("/api/user/locale?newLocale=en-US", {
                    method: "put",
                  }).then(() => window.location.reload())
                }
              >
                EN
              </button>
              <button
                className="px-4 py-2 hover:bg-gray-700 transition-colors"
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

        <div className="md:hidden flex flex-col  gap-3 text-white">
          <button
            style={{
              transform: isAnimated ? "translateX(0px)" : "translateX(-10px)",
              transition: "0.5s",
              transitionDelay: isOpen
                ? `${5 * animationDelayUnit}ms`
                : `${1 * animationDelayUnit}ms`,
            }}
            onClick={() =>
              fetch("/api/user/locale?newLocale=en-US", {
                method: "put",
              }).then(() => window.location.reload())
            }
          >
            EN
          </button>
          <button
            style={{
              transform: isAnimated ? "translateX(0px)" : "translateX(-10px)",
              transition: "0.5s",
              transitionDelay: isOpen
                ? `${6 * animationDelayUnit}ms`
                : `${0 * animationDelayUnit}ms`,
            }}
            onClick={() =>
              fetch("/api/user/locale?newLocale=zh-TW", {
                method: "put",
              }).then(() => window.location.reload())
            }
          >
            中文
          </button>
        </div>
      </nav>
      <button
        onClick={() => {
          if (isAnimated) {
            setIsAnimated(false);
            setTimeout(() => {
              setIsOpen(false);
            }, 900);
          } else {
            setIsOpen(true);
            setTimeout(() => {
              setIsAnimated(true);
            }, 0);
          }
        }}
        className="mobile-menu-button md:hidden"
        disabled={isAnimated !== isOpen}
      >
        <div className={`${isAnimated && "menu-open"}`}></div>
      </button>
    </>
  );
}
