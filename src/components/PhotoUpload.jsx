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
      description: "Cérémonie civile",
    },
    {
      id: "eglise",
      icon: "⛪",
      title: "Église",
      description: "Cérémonie religieuse",
    },
    {
      id: "reception",
      icon: "🌿",
      title: "Réception",
      description: "Cocktail & repas",
    },
    {
      id: "soiree",
      icon: "✨",
      title: "Soirée",
      description: "Danse & fête",
    },
    {
      id: "lendemain",
      icon: "☕",
      title: "Lendemain",
      description: "Encore un petit peu de plaisir",
    },
  ];

  function openFilePicker(album) {
    setSelectedAlbum(album);
    fileInputRef.current?.click();
  }

  async function handleFiles(event) {
    const files = Array.from(event.target.files);

    if (!selectedAlbum || files.length === 0) return;

    try {
      setUploading(true);
      setMessage("Envoi des photos...");

      await uploadPhotos(selectedAlbum, files);

      setMessage("📸 Merci ! Vos photos ont été envoyées.");
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <section className="bg-white/40 px-4 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-[#7a8b68]">
          Souvenirs
        </p>

        <h2 className="font-serif text-3xl text-[#4a4036] md:text-4xl">
          Partagez vos photos
        </h2>

        <div className="mx-auto mt-4 h-px w-24 bg-[#c8b89a]" />

        <p className="mx-auto mt-5 max-w-lg text-sm text-[#6b6258] md:text-base">
          Sélectionnez le moment du mariage auquel correspondent vos photos.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3">
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => openFilePicker(album.id)}
              disabled={uploading}
              className="
                group
                flex
                aspect-square
                flex-col
                items-center
                justify-center
                rounded-3xl
                border
                border-[#d8cbb5]
                bg-[#f8f4ed]
                p-4
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
                hover:shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#efe7da] text-3xl transition-transform duration-300 group-hover:scale-110">
                {album.icon}
              </div>

              <h3 className="mt-4 font-serif text-lg text-[#4a4036]">
                {album.title}
              </h3>

              <p className="mt-1 text-center text-xs text-[#6b6258]">
                {album.description}
              </p>

              <span className="mt-4 rounded-full bg-[#7a8b68] px-4 py-1.5 text-xs font-medium text-white">
                Ajouter des photos
              </span>
            </button>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFiles}
        />

        {message && <p className="mt-8 text-sm text-[#6b6258]">{message}</p>}
      </div>
    </section>
  );
}
