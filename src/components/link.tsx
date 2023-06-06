"use client";

import { KeyTextField } from "@prismicio/client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps {
  bgColor?: string;
  pageType: string;
  uid: string;
  typeDataTitle: KeyTextField;
}

export const LinkComponent: React.FC<IProps> = ({
  bgColor,
  pageType,
  uid,
  typeDataTitle,
}) => {
  const [colors, setColors] = useState<string>(
    bgColor || "bg-slate-800 hover:bg-slate-700"
  );

  useEffect(() => {
    determineColors(pageType);
  }, [pageType]);

  const determineColors = (pageType: string) => {
    switch (pageType) {
      case "hotel": {
        setColors("bg-blue-800 hover:bg-blue-700");
        break;
      }
      case "thematic": {
        setColors("bg-green-800 hover:bg-green-700");
        break;
      }
      case "region": {
        setColors("bg-red-800 hover:bg-red-700");
        break;
      }
      case "city": {
        setColors("bg-yellow-800 hover:bg-yellow-700");
        break;
      }
      default: {
        setColors("bg-slate-800 hover:bg-slate-700");
        break;
      }
    }
  };

  return (
    <Link
      href={{
        pathname: `/${pageType}/${uid}`,
      }}
      className={`${colors} hover:shadow-lg transition text-white rounded-md py-2 px-4 min-w-fit`}
    >
      {typeDataTitle}
    </Link>
  );
};
