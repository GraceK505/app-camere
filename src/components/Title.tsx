import { useTranslations } from "next-intl"


export const Title = () => {
    const t = useTranslations("titleOther")


    return (
        <h2 className="text-3xl font-bold text-[#2b2b2b]">
            {t("title")}
        </h2>
    )


}