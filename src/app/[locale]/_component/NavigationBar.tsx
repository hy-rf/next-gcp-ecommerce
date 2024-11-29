"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NavigationBar({ loggedIn }: { loggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showLocaleOptions, setShowLocaleOptions] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(isOpen);
    }, 100);
  }, [isOpen]);
  return (
    <>
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } ${isAnimated ? "opacity-100" : "opacity-0"} p-10 z-40 flex-col ml-o mt-[70px] text-center bg-[#808080d0] fixed left-0 color:white w-[100dvw] h-[100dvh] md:flex md:static md:flex md:flex-row md:gap-4 md:ml-auto md:mr-0 md:mt-0 md:w-auto md:h-auto md:z-auto md:p-0 md:bg-transparent transform ease-in-out duration-500 md:opacity-100 z-[999]`}
      >
        <Link
          style={{
            transform: isAnimated ? "translateX(0px)" : "translateX(-10px)",
            transition: "0.5s",
            transitionDelay: !isOpen ? "0.4s" : "0s",
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
                transitionDelay: !isOpen ? "0.3s" : "0.1s",
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
                transitionDelay: !isOpen ? "0.2s" : "0.2s",
              }}
              onClick={() => setIsOpen(false)}
              href={"/cart"}
            >
              Cart
            </Link>
            <Link
              style={{
                transform: isAnimated ? "translateX(0px)" : "translateX(-10px)",
                transition: "0.5s",
                transitionDelay: !isOpen ? "0.1s" : "0.3s",
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
              transitionDelay: !isOpen ? "0s" : "0.4s",
            }}
            onClick={() => setIsOpen(false)}
            href={"/user/login"}
          >
            Login
          </Link>
        )}
        <div
          className="hidden md:flex md:block"
          onMouseEnter={() => setShowLocaleOptions(true)}
          onMouseLeave={() => setShowLocaleOptions(false)}
        >
          <Image src="/locale.svg" width={26} height={26} alt="locales"></Image>
          {showLocaleOptions && (
            <div className="md:absolute md:top-header-height md:right-[-1rem] md:flex md:flex-col md:bg-[#808080e6] md:p-1 md:min-w-[5rem] md:black">
              <button
                className="hover:underline"
                onClick={() =>
                  fetch("/api/user/locale?newLocale=en-US", {
                    method: "put",
                  }).then(() => window.location.reload())
                }
              >
                EN
              </button>
              <button
                className="hover:underline"
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
      <button
        onClick={() => {
          if (isOpen) {
            setIsAnimated(false);
            setTimeout(() => {
              setIsOpen(!isOpen);
            }, 900);
          } else {
            setIsOpen(!isOpen);
          }
        }}
        className="md:hidden"
      >
        =
      </button>
    </>
  );
}
