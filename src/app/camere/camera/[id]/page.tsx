

import ClientGallery from "@/components/ClientGallery";
import { headers } from "next/headers";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>; // Important : Promise
}

export default async function SingleRoomPage({ params }: PageProps) {
  const { id } = await params;
  const isDev = process.env.NODE_ENV === 'development';
  const isProd = process.env.NODE_ENV === 'production';


  if (!id) {
    return <div className="p-8 text-center">ID de chambre manquant</div>;
  }
 
  try {
  const headersList = await headers();
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  const host = headersList.get('host') || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  // Fetch single room (assuming API returns all rooms)
  const response = await fetch(`${baseUrl}/api/getAll?id=${id}`);
  if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
  const allRooms = await response.json();
  const room = allRooms.find((r: any) => r.id.toString() === id);
  if (!room) return <div className="p-8 text-center">Chambre non trouvée</div>;

  // Fetch related rooms
  const multipleRooms = await fetch(`${baseUrl}/api/getAll`);
  const allRoomsList = await multipleRooms.json();
  const relatedRooms = allRoomsList.filter((r: any) => r.id.toString() !== id).slice(0, 2);
    // Affichage
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="relative w-full h-[320px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src={
                room?.images?.[id]
                  ? `/camere/${room.images[0].replace(/-\d+$/, "").trim()}.png`
                  : "https://blocks.astratic.com/img/general-img-landscape.png"
              }
              alt={room?.category || "Image de la chambre"}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
              Chambre & Suite
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              {room?.category || "Chambre de luxe"}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {room?.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
            </div>

            {/* Détails statiques (à adapter selon vos données) */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Capacité
                </p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {room?.capacity || "2–4 personnes"}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Superficie
                </p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {room?.area || "32 m²"}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Lit</p>
                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {room?.bedType || "King Size"}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="https://wa.me/+393519999999?text=Ciao%20GEA%20Guest%20House%2C%20vorrei%20prenotare%20la%20camera%20${room?.category}."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
              >
                Prenota ora
              </Link>
            </div>
          </div>
        </div>

        {/* DESCRIPTION LONGUE */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10">

          {room && room.category?.replace("Camera ", "").toLowerCase() === "eva" && (
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-fit">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Camera Eva è luminosa, accogliente e pensata per chi vuole vivere Siracusa con più spazio e comfort.
              </h2>
              <br />
              <br />
              <p>
                Dispone di un letto matrimoniale,
                un divano letto e un balcone con affaccio esterno,
                che regala luce naturale e un contatto diretto con la città.
              </p>
              <br />
              <p>
                Il bagno privato e gli spazi ben organizzati la rendono ideale sia per coppie che per piccoli gruppi o famiglie.
              </p>
              <br />
              <p>
                La camera è dotata di aria condizionata, mini frigo, bollitore e TV, per offrirti autonomia e comodità durante tutto il soggiorno.

                Inclusi asciugamani e kit doccia, per sentirsi subito a casa.
                #geaguesthouse #siracusa #b&b #stanze #sicilia
              </p>
            </div>
          )}

          {room && room.category?.replace("Camera ", "").toLowerCase() === "aria" && (
            <div className="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-fit">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Camera Aria è uno spazio intimo e rilassante, pensato per chi cerca comfort e tranquillità.
              </h2>
              <br />
              <p>
                Dotata di letto matrimoniale,
                divano letto e bagno privato,
                offre un ambiente funzionale e accogliente,
                perfetto per ogni tipo di soggiorno.
              </p>
              <br />
              <p>
                Il balcone con affaccio interno garantisce maggiore silenzio e privacy, ideale per riposare davvero e staccare dal ritmo della città.
              </p>
              <br />
              <p>
                La presenza di aria condizionata, mini frigo, bollitore e TV assicura praticità, indipendenza e momenti di relax.

                Asciugamani e kit doccia inclusi per un’esperienza completa e senza pensieri.
                #geaguesthouse #siracusa #b&b #sicilia #casavacanze
              </p>
            </div>
          )}

          {room && room.category?.replace("Camera ", "").toLowerCase() === "giulio" && (
            <div className="rounded-3xl w-70vw flex flex-col border border-gray-200 dark:border-gray-800 p-6 h-max">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Camera Giulio è la scelta ideale per chi cerca tranquillità, essenzialità e riposo di qualità.
              </h2>
              <br />
              <p>
                Dotata di un comodo letto matrimoniale e bagno privato,
                è perfetta per soggiorni pratici e senza distrazioni,
                sia per viaggio che per esigenze lavorative o personali.
              </p>
              <br />
              <p>
                La camera è equipaggiata con aria condizionata, mini frigo, bollitore e TV, per garantirti comfort e relax in ogni momento della giornata.
              </p>
              <br />
              <p>
                L’ambiente è curato, silenzioso e funzionale, ideale per ricaricarsi dopo una giornata a Siracusa.

                Inclusi asciugamani e kit doccia per un soggiorno senza pensieri.

                #b&bsiracusa #geaguesthouse #b&b #siracusa #casasiracusa
              </p>
            </div>
          )}

          <div className="rounded-3xl border border-gray-200 dark:border-gray-800 p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Équipements inclus
            </h3>
            <ul className="mt-5 space-y-3 text-gray-600 dark:text-gray-300">

              {room?.equipments?.split(",").map((equip: string, index: number) => (
                <li key={index}>✓ {equip}</li>
              ))}
            </ul>
          </div>
        </div>
        <br />
        <br />
        <br />
        <ClientGallery data={room} />
        {/* SUGGESTIONS - affichées uniquement s'il y a d'autres chambres */}
        {relatedRooms.length > 0 && (
          <div className="mt-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-emerald-600 font-medium">
                  Suggestions
                </p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  D’autres chambres à découvrir
                </h2>
              </div>
              <Link
                href="/camera"
                className="hidden md:inline-flex text-sm font-medium text-emerald-600 hover:text-emerald-700"
              >
                Voir toutes les chambres
              </Link>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {relatedRooms.map((item: any, index: number) => (
                <Link
                  key={item.id}
                  href={`/camere/camera/${item.id.toString()}`}
                  className="group rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={
                        item.images?.[index]
                          ? `/camere/${item.images[index].replace(/-\d+$/, "").trim()}.png`
                          : "https://blocks.astratic.com/img/general-img-landscape.png"
                      }
                      alt={item.title}
                      className="object-cover group-hover:scale-105 transition duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-emerald-600">
                        {item.price}
                      </span>
                      <span className="text-sm font-medium text-gray-500 group-hover:text-emerald-600 transition">
                        Voir →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    );
  } catch (error) {
    console.error("Erreur lors du fetch:", error);
    return (
      <div className="p-8 text-center text-red-600">
        Une erreur est survenue lors du chargement de la chambre.
      </div>
    );
  }
}
