import ClientGallery from "@/components/ClientGallery";
import { cookies, headers } from "next/headers";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default async function SingleRoomPage({ params }: PageProps) {
  const { id } = await params;
  const isDev = process.env.NODE_ENV === "development";
  const headersList = await headers();
  const cookieStore = await cookies();

  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  if (!id) {
    return <div className="p-8 text-center">ID de chambre manquant</div>;
  }

  try {
    // ✅ SAFE FETCH (works in dev + production)
    const response = await fetch(
      `${baseUrl}/api/getAll`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const allRooms = await response.json();
    // Find room by id after fetching all
    const room = allRooms.find((r: any) => r.id.toString() === id);

    if (!room) {
      return <div className="p-8 text-center">Chambre non trouvée</div>;
    }

    const relatedRooms = allRooms
      .filter((r: any) => r.id.toString() !== id)
      .slice(0, 3);

    const category = room.category?.replace("Camera ", "").toLowerCase();

    const mainImage =
      room?.images?.[0]
        ? `/camere/${room.images[0].replace(/-\d+$/, "").trim()}.png`
        : "https://blocks.astratic.com/img/general-img-landscape.png";

    return (
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">

        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="h-[320px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src={mainImage}
              alt={room.category}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="text-emerald-600 uppercase tracking-widest text-sm">
              Chambre & Suite
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3">
              {room.category}
            </h1>

            <p className="mt-5 text-gray-600">{room.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <Info label="Capacité" value={room.capacity} />
              <Info label="Superficie" value={room.area} />
              <Info label="Lit" value={room.bedType} />
            </div>

            <div className="mt-8">
              <Link
                href={`https://wa.me/393519999999?text=Ciao, vorrei prenotare ${room.category}`}
                target="_blank"
                className="px-6 py-3 bg-emerald-600 text-white rounded-full"
              >
                Prenota ora
              </Link>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10">

          {category === "eva" && (
            <Block title="Camera Eva">
              Camera luminosa, spaziosa e confortevole.
            </Block>
          )}

          {category === "aria" && (
            <Block title="Camera Aria">
              Spazio intimo e rilassante per soggiorni tranquilli.
            </Block>
          )}

          {category === "giulio" && (
            <Block title="Camera Giulio">
              Soluzione semplice e funzionale per ogni esigenza.
            </Block>
          )}

          <div className="border rounded-3xl p-6">
            <h3 className="text-xl font-semibold">Équipements inclus</h3>
            <ul className="mt-4 space-y-2">
              {room?.equipments?.split(",").map((e: string, i: number) => (
                <li key={i}>✓ {e}</li>
              ))}
            </ul>
          </div>
        </div>
        <br />
        <br />
        <br />
        {/* GALLERY */}
        <ClientGallery data={room} />

        {/* RELATED */}
        {relatedRooms.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold">
              D’autres chambres à découvrir
            </h2>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {relatedRooms.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/camere/camera/${item.id}`}
                  className="border rounded-3xl overflow-hidden hover:shadow-xl transition"
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
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
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

/* helpers */
function Info({ label, value }: any) {
  return (
    <div className="border rounded-2xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Block({ title, children }: any) {
  return (
    <div className="border rounded-3xl p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-4 text-gray-600">{children}</p>
    </div>
  );
}