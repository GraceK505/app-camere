'use client';

import { useTranslations } from 'next-intl';

interface RoomDetailsProps {
    category: 'eva' | 'aria' | 'giulio'; // restrict to valid room types
}

export function RoomDetails({ category }: RoomDetailsProps) {
    function renderWithInstagramTags(text: string) {
        const parts = text.split(/(#[a-zA-Z0-9_]+)/g);

        return parts.map((part, i) => {
            if (part.startsWith("#")) {
                const tag = part.replace("#", "");

                return (
                    <a
                        key={i}
                        href={`https://www.instagram.com/explore/tags/${tag}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4a4a4a] font-semibold hover:underline"
                    >
                        {part}
                    </a>
                );
            }

            return <span key={i}>{part}</span>;
        });
    }
    const t = useTranslations(`rooms.${category}`);

    return (
        <div className="bg-white/40 border border-[#cbbfae] rounded-3xl p-6 text-[#4a4a4a]">
            <h2 className="text-2xl font-bold">{t('title')}</h2>
            <p className="mt-4">{t('description1')}</p>
            <p className="mt-4">{t('description2')}</p>
            <p className="mt-4">{t('description3')}</p>
            <p className="mt-4">{t('amenities')}</p>
            <div className="mt-4">
                {renderWithInstagramTags(t('hashtags'))}
            </div>
        </div>
    );
}