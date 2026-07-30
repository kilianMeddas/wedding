"use client";

import { useRef, useState } from "react";
import { uploadPhotos } from "../services/photoService";

export default function PhotoUpload() {
  const fileInputRef = useRef(null);

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const albums = [
    {
      id: "mairie",
      icon: "🏛️",
      title: "Mairie",
      description: "La cérémonie civile",
    },
    {
      id: "eglise",
      icon: "⛪",
      title: "Église",
      description: "La cérémonie religieuse",
    },
    {
      id: "reception",
      icon: "🌿",
      title: "Réception",
      description: "Cocktail et repas",
    },
    {
      id: "soiree",
      icon: "✨",
      title: "Soirée",
      description: "Danse et festivités",
    },
    {
      id: "lendemain",
      icon: "☕",
      title: "Lendemain",
      description: "Les derniers souvenirs",
    },
  ];

  function openFilePicker(album) {
    setSelectedAlbum(album);
    fileInputRef.current.click();
  }

  async function handleFiles(event) {
    const files = Array.from(event.target.files);

    if (!selectedAlbum || files.length === 0) {
      return;
    }

    try {
      setUploading(true);
      setMessage("Envoi des photos...");

      await uploadPhotos(selectedAlbum, files);

      setMessage("Photos ajoutées avec succès 🌿");
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <section className="bg-white/40 px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#7a8b68]">
          Souvenirs
        </p>

        <h2 className="font-serif text-4xl text-[#4a4036]">
          Partagez vos photos
        </h2>

        <div className="mx-auto mt-5 h-px w-24 bg-[#c8b89a]" />

        <p className="mx-auto mt-6 max-w-xl text-[#6b6258]">
          Choisissez le moment du mariage auquel vos photos correspondent.
        </p>

        {/* Boutons albums */}

        <div className="mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => openFilePicker(album.id)}
              disabled={uploading}
              className="
                group
                flex
                flex-col
                items-center
                rounded-[2rem]
                border
                border-[#d8cbb5]
                bg-[#f8f4ed]
                px-6
                py-8
                shadow-sm
                transition
                duration-300
                hover:-translate-y-2
                hover:bg-white
                hover:shadow-xl
                disabled:opacity-50
              "
            >
              <span
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#efe7da]
                  text-3xl
                  transition
                  group-hover:scale-110
                "
              >
                {album.icon}
              </span>

              <h3 className="mt-6 font-serif text-2xl text-[#4a4036]">
                {album.title}
              </h3>

              <p className="mt-2 text-sm text-[#6b6258]">{album.description}</p>

              <span
                className="
                  mt-5
    flex
    min-h-12
    items-center
    rounded-full
    bg-[#7a8b68]
    px-6
    text-sm
    text-white
                "
              >
                Ajouter des photos
              </span>
            </button>
          ))}
        </div>

        {/* Input caché */}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />

        {message && <p className="mt-8 text-[#6b6258]">{message}</p>}
      </div>
    </section>
  );
}
