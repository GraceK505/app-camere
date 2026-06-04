import ClientGallery from "@/components/ClientGallery";
import { headers } from "next/headers";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

// 👉 Replace this with your real data source (DB / file / service)
async function getAllRooms() {
  const res = await fetch("http://localhost:3000/api/getAll", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load rooms");
  return res.json();
}

export default async function SingleRoomPage({ params }: PageProps) {
  const { id } = params;

  if (!id) {
    return <div className="p-8 text-center">ID de chambre manquant</div>;
  }

  try {
    const headersList = await headers();
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const host = headersList.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // ✅ ONE data fetch instead of multiple API calls
    const allRooms = await getAllRooms();

    const room = allRooms.find((r: any) => r.id.toString() === id);

    if (!room) {
      return <div className="p-8 text-center">Chambre non trouvée</div>;
    }

    const relatedRooms = allRooms
      .filter((r: any) => r.id.toString() !== id)
      .slice(0, 3);

    const categoryKey = room.category?.replace("Camera ", "").toLowerCase();

    const mainImage =
      room?.images?.[0]
        ? `/camere/${room.images[0].replace(/-\d+$/, "").trim()}.png`
        : "https://blocks.astratic.com/img/general-img-landscape.png";

    return (
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="relative w-full h-[320px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src={mainImage}
              alt={room?.category || "Image de la chambre"}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
              Chambre & Suite
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {room?.category || "Chambre de luxe"}
            </h1>

            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              {room?.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <Info label="Capacité" value={room?.capacity} fallback="2–4 personnes" />
              <Info label="Superficie" value={room?.area} fallback="32 m²" />
              <Info label="Lit" value={room?.bedType} fallback="King Size" />
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Link
                href={`https://wa.me/+393519999999?text=Ciao GEA Guest House, vorrei prenotare la camera ${room?.category}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
              >
                Prenota ora
              </Link>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10">
          {categoryKey === "eva" && (
            <RoomBlock title="Camera Eva">
              Camera luminosa, accogliente e perfetta per comfort e spazio.
            </RoomBlock>
          )}

          {categoryKey === "aria" && (
            <RoomBlock title="Camera Aria">
              Spazio intimo e rilassante per tranquillità e privacy.
            </RoomBlock>
          )}

          {categoryKey === "giulio" && (
            <RoomBlock title="Camera Giulio">
              Ideale per soggiorni semplici, silenziosi e funzionali.
            </RoomBlock>
          )}

          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-xl font-semibold">Équipements inclus</h3>
            <ul className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">
              {room?.equipments?.split(",").map((e: string, i: number) => (
                <li key={i}>✓ {e}</li>
              ))}
            </ul>
          </div>
        </div>

        <ClientGallery data={room} />

        {/* RELATED */}
        {relatedRooms.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold">D’autres chambres</h2>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {relatedRooms.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/camere/camera/${item.id}`}
                  className="rounded-3xl overflow-hidden border hover:shadow-xl transition"
                >
                  <img
                    src={
                      item.images?.[0]
                        ? `/camere/${item.images[0]
                            .replace(/-\d+$/, "")
                            .trim()}.png`
                        : "https://blocks.astratic.com/img/general-img-landscape.png"
                    }
                    className="h-64 w-full object-cover"
                    alt={item.title}
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="p-8 text-center text-red-600">
        Errore nel caricamento della camera
      </div>
    );
  }
}

/* ---------- helpers ---------- */

function Info({
  label,
  value,
  fallback,
}: {
  label: string;
  value?: string;
  fallback: string;
}) {
  return (
    <div className="rounded-2xl border p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value || fallback}</p>
    </div>
  );
}

function RoomBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border p-6 h-fit">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-4 text-gray-600">{children}</p>
    </div>
  );
}