import ClientGallery from "@/components/ClientGallery";
import ImageSlider from "@/components/ImageSlider";
import { RoomDetails } from "@/components/RoomDetails";
import { Title } from "@/components/Title";
import { useTranslations } from "next-intl";
import { cookies, headers } from "next/headers";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default async function SingleRoomPage({ params }: PageProps) {
  const { id } = await params;
  const isDev = process.env.NODE_ENV === "development";
  const headersList = await headers();

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
    const highlight = "text-white font-bold";
    const mainImage =
      room?.images?.[0]
        ? `/camere/${room.images[0].replace(/-\d+$/, "").trim()}.png`
        : "https://blocks.astratic.com/img/general-img-landscape.png";


    function handleGallery(state: boolean) {
      "use client"
      state = !state
    }
    const images = room
    return (
      <section className="pt-20 max-w-7xl mx-auto px-4 py-16 md:py-24 bg-[#00000000] text-[#2b2b2b]" style={{ backgroundImage: "url(/sfondo.jpeg)" }}>

        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          <ImageSlider
            title={room.category}
            category={category}
            images={room.images as any}
          >
            <div className="h-[320px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl">
              <img
                src={mainImage}
                alt={room.category}
                className="w-full h-full object-cover"
              />
            </div>
          </ImageSlider>

          <div>
            <h1 className="text-4xl md:text-5xl font-bold mt-3 text-[#2b2b2b]">
              {room.category}
            </h1>

            <p className="mt-5 text-[#4a4a4a]">
              {room.description}
            </p>

            <div className="mt-8">
              <Link
                href={`https://wa.me/+393921094730?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20una%20camera.`}
                target="_blank"
                className="px-6 py-3 border-2 border-[#000000bd] text-white bg-[#6b4e3d] hover:bg-[#5a4133] rounded-full hover:scale-105 transition"
              >
                Prenota ora
              </Link>
            </div>

          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10">

          {category && <RoomDetails category={category as 'eva' | 'aria' | 'giulio'} />}

          {/* EQUIPMENTS */}
          <div className="border border-[#cbbfae] rounded-3xl p-6 bg-white/30">
            <h3 className="text-xl font-semibold">Équipements inclus</h3>

            <ul className="mt-4 space-y-2 text-[#4a4a4a]">
              {room?.equipments?.split(",").map((e: string, i: number) => (
                <li key={i}>✓ {e}</li>
              ))}
            </ul>
          </div>

        </div>

        <br /><br />

        {/* RELATED */}
        {relatedRooms.length > 0 && (
          <div className="mt-24">

            <Title />

            <div className="mt-8 grid md:grid-cols-3 gap-6">

              {relatedRooms.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/camere/camera/${item.id}`}
                  className="border border-[#cbbfae] rounded-3xl overflow-hidden hover:shadow-xl transition bg-white/30"
                >

                  <img
                    src={
                      item.images?.[0]
                        ? `/camere/${item.images[0].replace(/-\d+$/, "").trim()}.png`
                        : "https://blocks.astratic.com/img/general-img-landscape.png"
                    }
                    className="h-auto md:h-64 w-full object-cover"
                    alt={item.title}
                  />

                  <div className="p-5">

                    <h3 className="font-semibold text-[#2b2b2b]">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#5a5a5a]">
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
      <p className="mt-4 text-[#4a4a4a]">{children}</p>
    </div>
  );
}