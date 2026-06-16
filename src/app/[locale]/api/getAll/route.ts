import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import path from "path";

export const runtime = "nodejs";

type Room = {
  id: number;
  category: string;
  equipments: string;
  description: string;
  price: number;
  stato: string;
  images: string[];
  imagesPath: string;
};

const dbPath = path.join(process.cwd(), "app-camere-db.db");

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Database connection error:", err);
    } else {
      console.log("Connected to SQLite database");
    }
  }
);

const TABLES = {
  it: "app_camere",
  en: "app_camere_en",
  fr: "app_camere_fr",
  es: "app_camere_es",
} as const;

function getTableNameFromRequest(request: NextRequest): string {
  const { pathname, searchParams } = request.nextUrl;

  // First check query parameter
  let locale = searchParams.get("locale");
  
  if (!locale) {
    const match = pathname.match(/^\/(it|en|fr|es)(\/|$)/);
    locale = match?.[1] ?? "en";
  }

  const table =
    TABLES[locale as keyof typeof TABLES] ?? TABLES.it;

  console.log("Path:", pathname);
  console.log("Locale:", locale);
  console.log("Table:", table);

  return table;
}

function getAllRooms(tableName: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getRoomById(tableName: string, id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function parseImages(row: any): string[] {
  if (!row?.images) return [];

  try {
    return typeof row.images === "string"
      ? JSON.parse(row.images)
      : row.images;
  } catch (error) {
    console.error("Image parsing error:", error);
    return [];
  }
}

function mapRoom(row: any): Room {
  return {
    id: row.id,
    category: row.category,
    equipments: row.equipments,
    description: row.description,
    price: row.price,
    stato: row.stato,
    images: parseImages(row),
    imagesPath: row.imagePath ?? "",
  };
}

export async function GET(request: NextRequest) {
  try {
    const tableName = getTableNameFromRequest(request);

    const idParam = request.nextUrl.searchParams.get("id");

    console.log(
      `GET rooms | table=${tableName} | id=${idParam}`
    );

    if (idParam) {
      const id = Number(idParam);

      if (Number.isNaN(id)) {
        return NextResponse.json(
          { error: "Invalid room id" },
          { status: 400 }
        );
      }

      const row = await getRoomById(tableName, id);

      if (!row) {
        return NextResponse.json(
          { error: "Room not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(mapRoom(row));
    }

    const rows = await getAllRooms(tableName);

    return NextResponse.json(rows.map(mapRoom));
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch rooms",
        details:
          error instanceof Error
            ? error.message
            : String(error),
      },
      { status: 500 }
    );
  }
}