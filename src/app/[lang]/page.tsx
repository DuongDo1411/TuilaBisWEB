import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/dictionaries";
import { Experience } from "@/components/Experience";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Experience initialLang={lang} />;
}
