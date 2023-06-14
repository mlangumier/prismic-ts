interface IProps {
  params: { locale: string };
  children?: ReactNode;
}

export async function generateMetadata({ params }: IProps) {
  const settings = await getSettings(params.locale);

  return {
    title: settings.data.site_title,
  };
}

export default async function Layout({ children, params }: IProps) {
  const settings = await getSettings(params.locale);

  return <></>;
}
