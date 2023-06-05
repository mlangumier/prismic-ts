import { PrismicRichText } from "@prismicio/react";
import { RichTextField, TitleField } from "@prismicio/types";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

interface IProps {
  bgColor?: string;
  pageType: string;
  uid: string;
  typeDataTitle: string;
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
      case "experience": {
        setColors("bg-blue-800 hover:bg-blue-700");
        break;
      }
      case "thematique": {
        setColors("bg-green-800 hover:bg-green-700");
        break;
      }
      case "location":
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
        pathname: `/${pageType}/[uid]`,
        query: { uid },
      }}
      className={`${colors} hover:shadow-lg transition text-white rounded-md py-2 px-4 min-w-fit`}
    >
      {typeDataTitle}
    </Link>
  );
};
