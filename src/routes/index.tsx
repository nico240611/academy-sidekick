import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "English Classroom | Plataforma Académica 2026-2" },
      {
        name: "description",
        content:
          "Plataforma del curso de inglés: cronograma 2026-2, fechas importantes, boletín de notas y panel docente.",
      },
      { property: "og:title", content: "English Classroom | Plataforma Académica 2026-2" },
      {
        property: "og:description",
        content:
          "Cronograma, fechas importantes, boletín de notas y panel docente del curso de inglés.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/classroom/index.html");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">
        Abriendo English Classroom…{" "}
        <a className="underline" href="/classroom/index.html">
          Entrar
        </a>
      </p>
    </div>
  );
}
