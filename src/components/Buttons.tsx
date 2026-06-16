import { useTranslations } from "next-intl"
import Link from "next/link"

export const Buttons = () => {

    const t = useTranslations("buttons")

    return (
                      <Link
                href={`https://wa.me/+393921094730?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera.`}
                target="_blank"
                className="px-6 py-3 border-2 border-[#000000bd] text-white bg-[#6b4e3d] hover:bg-[#5a4133] rounded-full hover:scale-105 transition"
              >
                {t("bookNow")}
              </Link>
    )
}