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
            className="text-emerald-400 font-semibold hover:underline"
          >
            {part}
          </a>
        );
      }

      return <span key={i}>{part}</span>;
    });
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

    return (
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 bg-[#e3dac8] text-[#2b2b2b]">

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

            <p className="text-[#7a6a5a] uppercase tracking-widest text-sm">
              Chambre & Suite
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mt-3 text-[#2b2b2b]">
              {room.category}
            </h1>

            <p className="mt-5 text-[#4a4a4a]">
              {room.description}
            </p>

            <div className="mt-8">
              <Link
                href={`https://wa.me/393519999999?text=Ciao, vorrei prenotare ${room.category}`}
                target="_blank"
                className="px-6 py-3 bg-[#2b2b2b] text-[#e3dac8] rounded-full hover:scale-105 transition"
              >
                Prenota ora
              </Link>
            </div>

          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10">

          {/* EVA */}
          {category === "eva" && (
            <Block className="bg-white/40 border border-[#cbbfae] rounded-3xl p-6 text-[#2b2b2b]">

              <h2 className="text-2xl font-bold">
                Camera Eva è luminosa, accogliente e pensata per chi vuole vivere Siracusa con più spazio e comfort.
              </h2>

              <p className="mt-4">
                Dispone di <strong className="text-[#2b2b2b] font-bold">letto matrimoniale</strong>,{" "}
                <strong className="text-[#2b2b2b] font-bold">divano letto</strong> e{" "}
                <strong className="text-[#2b2b2b] font-bold">balcone esterno</strong>.
              </p>

              <p className="mt-4">
                Il <strong className="text-[#2b2b2b] font-bold">bagno privato</strong> e gli spazi organizzati la rendono ideale per{" "}
                <strong className="text-[#2b2b2b] font-bold">coppie e famiglie</strong>.
              </p>

              <p className="mt-4">
                Dotata di <strong className="text-[#2b2b2b] font-bold">aria condizionata</strong>,{" "}
                <strong className="text-[#2b2b2b] font-bold">mini frigo</strong>,{" "}
                <strong className="text-[#2b2b2b] font-bold">bollitore</strong> e{" "}
                <strong className="text-[#2b2b2b] font-bold">TV</strong>.
              </p>

              <p className="mt-4">
                Inclusi <strong className="text-[#2b2b2b] font-bold">asciugamani</strong> e{" "}
                <strong className="text-[#2b2b2b] font-bold">kit doccia</strong>.
              </p>

              <div className="mt-4">
                {renderWithInstagramTags(`#geaguesthouse #siracusa #b&b #stanze #sicilia`)}
              </div>

            </Block>
          )}

          {/* ARIA */}
          {category === "aria" && (
            <Block className="bg-white/40 border border-[#cbbfae] rounded-3xl p-6 text-[#2b2b2b]">

              <h2 className="text-2xl font-bold">
                Camera Aria è uno spazio intimo e rilassante.
              </h2>

              <p className="mt-4">
                Dotata di <strong className="font-bold">letto matrimoniale</strong>,{" "}
                <strong className="font-bold">divano letto</strong> e{" "}
                <strong className="font-bold">bagno privato</strong>.
              </p>

              <p className="mt-4">
                Il <strong className="font-bold">balcone interno</strong> garantisce privacy e silenzio.
              </p>

              <p className="mt-4">
                Dotata di <strong className="font-bold">aria condizionata</strong>,{" "}
                <strong className="font-bold">mini frigo</strong>,{" "}
                <strong className="font-bold">bollitore</strong> e{" "}
                <strong className="font-bold">TV</strong>.
              </p>

              <p className="mt-4">
                Inclusi <strong className="font-bold">asciugamani</strong> e{" "}
                <strong className="font-bold">kit doccia</strong>.
              </p>

              <div className="mt-4">
                {renderWithInstagramTags(`#geaguesthouse #siracusa #b&b #sicilia #casavacanze`)}
              </div>

            </Block>
          )}

          {/* GIULIO */}
          {category === "giulio" && (
            <Block className="bg-white/40 border border-[#cbbfae] rounded-3xl p-6 text-[#2b2b2b]">

              <h2 className="text-2xl font-bold">
                Camera Giulio è perfetta per relax e semplicità.
              </h2>

              <p className="mt-4">
                Dotata di <strong className="font-bold">letto matrimoniale</strong> e{" "}
                <strong className="font-bold">bagno privato</strong>.
              </p>

              <p className="mt-4">
                Dotata di <strong className="font-bold">aria condizionata</strong>,{" "}
                <strong className="font-bold">mini frigo</strong>,{" "}
                <strong className="font-bold">bollitore</strong> e{" "}
                <strong className="font-bold">TV</strong>.
              </p>

              <p className="mt-4">
                Inclusi <strong className="font-bold">asciugamani</strong> e{" "}
                <strong className="font-bold">kit doccia</strong>.
              </p>

              <div className="mt-4">
                {renderWithInstagramTags(`#b&bsiracusa #geaguesthouse #siracusa #casasiracusa`)}
              </div>

            </Block>
          )}

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

        <br /><br /><br />

        {/* GALLERY */}
        <ClientGallery data={room} />

        {/* RELATED */}
        {relatedRooms.length > 0 && (
          <div className="mt-24">

            <h2 className="text-3xl font-bold text-[#2b2b2b]">
              D’autres chambres à découvrir
            </h2>

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
                    className="h-64 w-full object-cover"
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
      <p className="mt-4 text-white">{children}</p>
    </div>
  );
}