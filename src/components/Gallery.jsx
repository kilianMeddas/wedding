"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getPhotos } from "../services/photoService";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAlbum, setSelectedAlbum] = useState("Tous");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        const data = await getPhotos();
        setPhotos(data);
      } catch (error) {
        console.error("Failed to load photos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();
  }, []);

  const albums = useMemo(() => {
    return ["Tous", ...new Set(photos.map((photo) => photo.album))];
  }, [photos]);

  const filteredPhotos =
    selectedAlbum === "Tous"
      ? photos
      : photos.filter((photo) => photo.album === selectedAlbum);

  function openPhoto(photo) {
    setSelectedPhoto(photo);
  }

  function closePhoto() {
    setSelectedPhoto(null);
  }

  function nextPhoto() {
    const currentIndex = filteredPhotos.findIndex(
      (photo) => photo.name === selectedPhoto.name,
    );

    const nextIndex = (currentIndex + 1) % filteredPhotos.length;

    setSelectedPhoto(filteredPhotos[nextIndex]);
  }

  function previousPhoto() {
    const currentIndex = filteredPhotos.findIndex(
      (photo) => photo.name === selectedPhoto.name,
    );

    const previousIndex =
      (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;

    setSelectedPhoto(filteredPhotos[previousIndex]);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f4ed]">
        <p className="text-[#7a8b68]">Chargement des souvenirs...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8f4ed] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#7a8b68]">
            Souvenirs
          </p>

          <div className="mx-auto mt-6 h-px w-24 bg-[#c8b89a]" />

          <p className="mt-6 text-[#6b6258]">
            Retrouvez tous les moments de notre mariage.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-14 flex flex-wrap justify-center gap-3">
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => setSelectedAlbum(album)}
              className={`
                rounded-full
                border
                px-6
                py-2.5
                text-sm
                capitalize
                transition-all
                duration-300

                ${
                  selectedAlbum === album
                    ? `
                    border-[#7a8b68]
                    bg-[#7a8b68]
                    text-white
                    shadow-md
                    `
                    : `
                    border-[#d8cbb5]
                    bg-white/60
                    text-[#5f554b]
                    hover:bg-[#efe7da]
                    `
                }
              `}
            >
              {album}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {filteredPhotos.map((photo) => (
            <div
              key={photo.name}
              onClick={() => openPhoto(photo)}
              className="
                group
                cursor-pointer
                overflow-hidden
                rounded-[2rem]
                border
                border-[#d8cbb5]
                bg-white
                shadow-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={photo.url}
                  alt={photo.name}
                  width={600}
                  height={600}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          onClick={closePhoto}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            p-6
            animate-in
            fade-in
            duration-300
          "
        >
          {/* Close button */}
          <button
            onClick={closePhoto}
            className="
              absolute
              right-6
              top-6
              text-4xl
              text-white
              transition
              hover:scale-110
            "
          >
            ×
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              previousPhoto();
            }}
            className="
              absolute
              left-4
              rounded-full
              bg-white/20
              px-4
              py-3
              text-3xl
              text-white
              backdrop-blur
              transition
              hover:bg-white/40
            "
          >
            ‹
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              animate-in
              zoom-in
              duration-300
            "
          >
            <Image
              src={selectedPhoto.url}
              alt={selectedPhoto.name}
              width={1400}
              height={1400}
              className="
                max-h-[85vh]
                w-auto
                rounded-3xl
                object-contain
                shadow-2xl
              "
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="
              absolute
              right-4
              rounded-full
              bg-white/20
              px-4
              py-3
              text-3xl
              text-white
              backdrop-blur
              transition
              hover:bg-white/40
            "
          >
            ›
          </button>

          {/* Counter */}
          <div
            className="
              absolute
              bottom-6
              rounded-full
              bg-black/40
              px-5
              py-2
              text-sm
              text-white
              backdrop-blur
            "
          >
            {filteredPhotos.findIndex(
              (photo) => photo.name === selectedPhoto.name,
            ) + 1}
            {" / "}
            {filteredPhotos.length}
          </div>
        </div>
      )}
    </section>
  );
}
