import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Heading,
  FilterChip,
} from "../design-system/Primitives.jsx";
import { archiveEntries, asset } from "../content/site.js";
export function ArchiveCard({ entry }) {
  return (
    <Card id={entry.id} className="archive-card" data-category={entry.category}>
      <a
        href={asset(`archivo-${entry.id}.webp`)}
        target="_blank"
        rel="noopener"
        aria-label={`Ver imagen restaurada ampliada: ${entry.title}`}
      >
        <img
          src={asset(`archivo-${entry.id}.webp`)}
          width="1600"
          height="1200"
          loading="lazy"
          alt={`${entry.title}, fotografía histórica restaurada.`}
        />
      </a>
      <div className="archive-card-copy">
        <span className="micro">Archivo · {entry.category}</span>
        <Heading>{entry.title}</Heading>
        <p>{entry.description}</p>
        <details>
          <summary>Comparar con la foto original</summary>
          <img
            src={asset(`original-${entry.id}.webp`)}
            width="1200"
            height="900"
            loading="lazy"
            alt={`Fotografía original de archivo: ${entry.title}.`}
          />
          <span className="caption">Original, sin restauración.</span>
        </details>
      </div>
    </Card>
  );
}
export function ArchiveGallery() {
  const [filter, setFilter] = useState("todos");
  const entries = archiveEntries.filter(
    (entry) => filter === "todos" || entry.category === filter,
  );
  useEffect(() => {
    function restoreAnchor() {
      const id = decodeURIComponent(location.hash.slice(1));
      if (archiveEntries.some((entry) => entry.id === id)) {
        setFilter("todos");
        requestAnimationFrame(() =>
          requestAnimationFrame(() =>
            document.getElementById(id)?.scrollIntoView(),
          ),
        );
      }
    }
    restoreAnchor();
    addEventListener("hashchange", restoreAnchor);
    return () => removeEventListener("hashchange", restoreAnchor);
  }, []);
  return (
    <Container as="section" className="archive-gallery">
      <div className="filters" role="group" aria-label="Filtrar archivo">
        {["todos", "bebé", "hogar", "infantil", "taller"].map((category) => (
          <FilterChip
            key={category}
            selected={category === filter}
            onClick={() => setFilter(category)}
          >
            {category === "todos"
              ? "Todo el archivo"
              : category[0].toUpperCase() + category.slice(1)}
          </FilterChip>
        ))}
      </div>
      <p className="caption" role="status" aria-live="polite">
        {entries.length} {entries.length === 1 ? "fotografía" : "fotografías"}
      </p>
      <div className="archive-grid">
        {entries.map((entry) => (
          <ArchiveCard key={entry.id} entry={entry} />
        ))}
      </div>
    </Container>
  );
}
