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

console.log("Database path:", dbPath);

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

const getAllRooms = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM app_camere", [], (err, rows) => {
      if (err) {
        console.error("getAllRooms error:", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getRoomById = (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM app_camere WHERE id = ?",
      [id],
      (err, row) => {
        if (err) {
          console.error("getRoomById error:", err);
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};

const parseImages = (row: any): string[] => {
  if (!row?.images) return [];

  try {
    return typeof row.images === "string"
      ? JSON.parse(row.images)
      : row.images;
  } catch (err) {
    console.error("Image parsing error:", err);
    return [];
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    console.log("Received GET request with id:", searchParams);
    if (idParam) {
      const id = Number(idParam);

      if (Number.isNaN(id)) {
        return NextResponse.json(
          { error: "Invalid room id" },
          { status: 400 }
        );
      }

      const row = await getRoomById(id);

      if (!row) {
        return NextResponse.json(
          { error: "Room not found" },
          { status: 404 }
        );
      }

      const room: Room = {
        id: row.id,
        category: row.category,
        equipments: row.equipments,
        description: row.description,
        price: row.price,
        stato: row.stato,
        images: parseImages(row),
        imagesPath: row.imagesPath,
      };

      return NextResponse.json(room);
    }

    const rows = await getAllRooms();

    const rooms: Room[] = rows.map((row) => ({
      id: row.id,
      category: row.category,
      equipments: row.equipments,
      description: row.description,
      price: row.price,
      stato: row.stato,
      images: parseImages(row),
      imagesPath: row.imagesPath,
    }));

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch rooms",
        details:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}