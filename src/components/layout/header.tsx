import { LinkNextComponent } from "@/components/link";
import { PrismicNextLink } from "@prismicio/next";
import { SettingsDocument } from "../../../prismicio-types";
import { usePathname } from "next/navigation";

export async function Header({
  settings,
  locales,
  lang,
}: {
  settings: SettingsDocument;
  locales: any[];
  lang: string;
}) {
  const pathname = usePathname();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    segments[1] = locale;

    return segments.join("/");
  };

  return (
    <header className="bg-slate-50 mb-12 shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <LinkNextComponent href={`/`} className="">
          {settings.data.site_title}
        </LinkNextComponent>

        <nav className="">
          <ul className="flex justify-center gap-2">
            {settings.data.navigation.map((item) => {
              const path = item.link.type === "homepage" ? "/" : item.link.type;

              return (
                <li
                  key={item.label}
                  className="text-slate-700 hover:text-slate-500  transition "
                >
                  <LinkNextComponent href={path}>
                    {item.label}
                  </LinkNextComponent>
                </li>
              );
            })}
          </ul>
        </nav>

        <div>
          <ul className="flex flex-row gap-2">
            {locales.map((locale) => {
              return lang !== locale.lang ? (
                <li className="" key={locale.lang}>
                  <LinkNextComponent
                    href={redirectedPathname(locale.lang)}
                    locale={locale.lang}
                    aria-label={`Change language to ${locale.lang_name}`}
                  >
                    {locale.lang}
                  </LinkNextComponent>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
