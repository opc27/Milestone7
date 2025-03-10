import React from "react";
import {
  StatusIconsProps,
  MenuIconProps,
  ChatIconProps,
  ArrowIconProps,
} from "./types";

export const StatusIcons: React.FC<StatusIconsProps> = ({ className }) => (
  <svg
    width="135"
    height="14"
    viewBox="0 0 135 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M43.1152 2.03301C43.1152 1.39996 42.6376 0.88678 42.0485 0.88678H40.9818C40.3927 0.88678 39.9152 1.39996 39.9152 2.03301V11.967C39.9152 12.6 40.3927 13.1132 40.9818 13.1132H42.0485C42.6376 13.1132 43.1152 12.6 43.1152 11.967V2.03301ZM35.681 3.33206H36.7477C37.3368 3.33206 37.8144 3.85756 37.8144 4.5058V11.9395C37.8144 12.5877 37.3368 13.1132 36.7477 13.1132H35.681C35.0919 13.1132 34.6144 12.5877 34.6144 11.9395V4.5058C34.6144 3.85756 35.0919 3.33206 35.681 3.33206ZM31.3493 5.98111H30.2826C29.6935 5.98111 29.2159 6.5133 29.2159 7.16979V11.9245C29.2159 12.581 29.6935 13.1132 30.2826 13.1132H31.3493C31.9384 13.1132 32.4159 12.581 32.4159 11.9245V7.16979C32.4159 6.5133 31.9384 5.98111 31.3493 5.98111ZM26.0485 8.4264H24.9818C24.3927 8.4264 23.9152 8.95099 23.9152 9.5981V11.9415C23.9152 12.5886 24.3927 13.1132 24.9818 13.1132H26.0485C26.6376 13.1132 27.1152 12.5886 27.1152 11.9415V9.5981C27.1152 8.95099 26.6376 8.4264 26.0485 8.4264Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M58.6864 3.30213C61.1736 3.30223 63.5656 4.22432 65.3681 5.8778C65.5038 6.00545 65.7208 6.00384 65.8544 5.87419L67.1519 4.61072C67.2196 4.54496 67.2574 4.45588 67.2568 4.3632C67.2562 4.27052 67.2174 4.18187 67.1489 4.11688C62.4179 -0.257833 54.9542 -0.257833 50.2232 4.11688C50.1547 4.18183 50.1158 4.27044 50.1152 4.36313C50.1145 4.45581 50.1522 4.54491 50.2198 4.61072L51.5177 5.87419C51.6513 6.00404 51.8684 6.00565 52.0041 5.8778C53.8068 4.22421 56.1991 3.30212 58.6864 3.30213Z"
      fill="black"
    />
    <rect
      opacity="0.35"
      x="74.7568"
      y="1"
      width="24"
      height="12"
      rx="3.8"
      stroke="black"
    />
    <path
      opacity="0.4"
      d="M100.257 5.28113V9.3566C101.062 9.01143 101.585 8.20847 101.585 7.31886C101.585 6.42926 101.062 5.6263 100.257 5.28113Z"
      fill="black"
    />
    <rect x="76.2568" y="2.5" width="21" height="9" rx="2.5" fill="black" />
  </svg>
);

export const MenuIcon: React.FC<MenuIconProps> = ({ className }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 18.5V16.5H21V18.5H3ZM3 13.5V11.5H21V13.5H3ZM3 8.5V6.5H21V8.5H3Z"
      fill="#006D3A"
    />
  </svg>
);

export const ChatIcon: React.FC<ChatIconProps> = ({ className }) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22.5 22.5V4.5C22.5 3.95 22.3042 3.47917 21.9125 3.0875C21.5208 2.69583 21.05 2.5 20.5 2.5H4.5C3.95 2.5 3.47917 2.69583 3.0875 3.0875C2.69583 3.47917 2.5 3.95 2.5 4.5V16.5C2.5 17.05 2.69583 17.5208 3.0875 17.9125C3.47917 18.3042 3.95 18.5 4.5 18.5H18.5L22.5 22.5Z"
      fill="#FFF9FF"
    />
  </svg>
);

export const ArrowIcon: React.FC<ArrowIconProps> = ({ className }) => (
  <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M5 10H19M19 10L12 4.16667M19 10L12 15.8333"
      stroke="#F5F5F5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
