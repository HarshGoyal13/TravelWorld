"use client";

import React from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

// Updated footer links
const FooterLinks = [
  {
    title: "Explore",
    links: [
      { title: "Destinations", link: "/destinations" },
      { title: "Hotels", link: "/hotels" },
      { title: "Vacation Rentals", link: "/vacation-rentals" },
      { title: "Travel Guides", link: "/travel-guides" },
      { title: "Special Offers", link: "/special-offers" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { title: "Contact Us", link: "/contact-us" },
      { title: "FAQs", link: "/faqs" },
      { title: "Booking Information", link: "/booking-info" },
      { title: "Cancellation Policy", link: "/cancellation-policy" },
      { title: "Track Booking", link: "/track-booking" },
    ],
  },
  {
    title: "About Us",
    links: [
      { title: "Our Story", link: "/our-story" },
      { title: "Careers", link: "/careers" },
      { title: "Press", link: "/press" },
      { title: "Terms of Service", link: "/terms-of-service" },
      { title: "Privacy Policy", link: "/privacy-policy" },
    ],
  },
];

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Travel Tips",
  "Destination Guides",
  "Booking FAQs",
];
const Plans = ["Premium Membership", "Family Packages", "Corporate Solutions"];
const Community = ["Forums", "Events", "Travel Meetups"];

const Footer = () => {
  return (
    <div className="bg-white text-black font mt-5 roboto">
      <hr />
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">

            <Link href="/" className="flex items-center gap-1 transition-all">
                    <h1 className="text-[#cec7c7] text-2xl font-bold">
                        TravelGod
                    </h1>
                    <AiOutlineHome
                        size={25}
                        color="#cec7c7"
                    />
              </Link>

              <h1 className="text-blue-600 font-semibold text-[16px]">Company</h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <div
                    key={i}
                    className="text-[14px] cursor-pointer hover:text-blue-800 transition-all duration-200"
                  >
                    <Link href={`/${ele.toLowerCase()}`}>{ele}</Link>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-blue-600 font-black text-[16px]">Resources</h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-blue-800 transition-all duration-200"
                  >
                    <Link href={`/${ele.split(" ").join("-").toLowerCase()}`}>{ele}</Link>
                  </div>
                ))}
              </div>

              <h1 className="text-blue-600 font-semibold text-[16px] mt-7">Support</h1>
              <div className="text-[14px] cursor-pointer hover:text-blue-800 transition-all duration-200 mt-2">
                <Link href="/help-center">Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-blue-600 font-semibold text-[16px]">Plans</h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-blue-800 transition-all duration-200"
                  >
                    <Link href={`/${ele.split(" ").join("-").toLowerCase()}`}>{ele}</Link>
                  </div>
                ))}
              </div>
              <h1 className="text-blue-600 font-semibold text-[16px] mt-7">Community</h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => (
                  <div
                    key={index}
                    className="text-[14px] cursor-pointer hover:text-blue-800 transition-all duration-200"
                  >
                    <Link href={`/${ele.split(" ").join("-").toLowerCase()}`}>{ele}</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLinks.map((ele, i) => (
              <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                <h1 className="text-blue-600 font-semibold text-[16px]">{ele.title}</h1>
                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, index) => (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-blue-800 transition-all duration-200"
                    >
                      <Link href={link.link}>{link.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => (
              <div
                key={i}
                className={` ${
                  BottomFooter.length - 1 === i
                    ? ""
                    : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                } px-3 `}
              >
                <Link href={`/${ele.split(" ").join("-").toLowerCase()}`}>{ele}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
