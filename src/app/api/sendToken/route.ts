import { NextResponse } from 'next/server';
import path from 'path';
import sqlite3 from 'sqlite3';

function getDB() {
    const db = new sqlite3.Database(
        path.resolve("./user_role.db"),
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    );
    return db;
}

function queryDB(db: sqlite3.Database, sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export async function POST(request: Request) {
    let db: sqlite3.Database | null = null;

    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required' },
                { status: 400 }
            );
        }

        db = getDB();

        const rows = await queryDB(db, 'SELECT * FROM user_role WHERE key = ?', [token]);
        if (rows.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Invalid token' },
                { status: 401 }
            );
        } else {
            // Invalidate the token after use
            await queryDB(db, 'UPDATE user_role SET key = NULL WHERE key = ?', [token]);   
            return NextResponse.json(
                { success: true, message: 'Authentication successful' },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        if (db) {
            db.close();
        }

    }
}