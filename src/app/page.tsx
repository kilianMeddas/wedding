import PhotoUpload from "../components/PhotoUpload";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f4ed] text-[#4a4036]">
      {/* Hero */}
      <section
        className="
          flex
          flex-col
          items-center
          px-5
          py-14
          text-center
          sm:px-8
          sm:py-20
        "
      >
        <p
          className="
            mb-3
            text-xs
            uppercase
            tracking-[0.3em]
            text-[#7a8b68]
            sm:text-sm
          "
        >
          Notre mariage
        </p>

        <h1
          className="
            font-serif
            text-4xl
            leading-tight
            sm:text-6xl
          "
        >
          Eric
          <span className="mx-3 text-[#b07d62]">&</span>
          Valérie
        </h1>

        <div className="my-6 h-px w-24 bg-[#c8b89a] sm:w-32" />

        <p className="text-lg text-[#6b6258] sm:text-xl">26 Septembre 2026</p>

        {/* Photo mariés */}
        <div
          className="
            mt-8
            flex
            aspect-[4/5]
            w-full
            max-w-sm
            items-center
            justify-center
            overflow-hidden
            rounded-[2rem]
            border
            border-[#d8cbb5]
            bg-[#efe7da]
            shadow-lg
            sm:mt-12
            sm:max-w-lg
          "
        >
          <p
            className="
              px-6
              text-center
              font-serif
              text-base
              italic
              text-[#8a7c6b]
            "
          >
            Photo des mariés
          </p>
        </div>

        <p
          className="
            mt-8
            max-w-xl
            text-base
            leading-relaxed
            text-[#6b6258]
            sm:text-lg
          "
        >
          Bienvenue sur notre espace de mariage.
          <br />
          Partagez avec nous vos plus beaux souvenirs de cette journée.
        </p>
      </section>

      {/* Upload */}
      <PhotoUpload />

      {/* Galerie */}
      <section
        className="
          px-5
          py-14
          text-center
          sm:px-8
          sm:py-20
        "
      >
        <div className="mx-auto max-w-xl">
          <div className="mx-auto mb-6 h-px w-24 bg-[#c8b89a]" />

          <p
            className="
              mb-3
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#7a8b68]
              sm:text-sm
            "
          >
            Souvenirs
          </p>

          <h2
            className="
              font-serif
              text-3xl
              sm:text-4xl
            "
          >
            Retrouvez toutes les photos
          </h2>

          <p
            className="
              mt-4
              text-sm
              text-[#6b6258]
              sm:text-base
            "
          >
            Parcourez les souvenirs capturés durant cette belle journée.
          </p>

          <a
            href="/galerie"
            className="
              mt-7
              inline-flex
              min-h-12
              items-center
              justify-center
              rounded-full
              bg-[#7a8b68]
              px-8
              text-sm
              text-white
              shadow-md
              transition
              hover:bg-[#687857]
              sm:text-base
            "
          >
            Voir les galeries
          </a>
        </div>
      </section>
    </main>
  );
}
