import { NextResponse } from 'next/server';
import path from 'path';
import sqlite3 from 'sqlite3';
import { Resend } from 'resend';
import crypto from 'crypto';  // ✅ import crypto

function getDB() {
    const dbPath = path.resolve(process.cwd(), "user_role.db");  // ✅ absolute path
    const db = new sqlite3.Database(
        dbPath,
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
            if (err) console.error("DB connection error:", err.message);
            else console.log("Connected to SQLite database at", dbPath);
        }
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

function runDB(db: sqlite3.Database, sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export async function POST(request: Request) {
    let db: sqlite3.Database | null = null;
    try {
        const { email } = await request.json();
        console.log("Received email:", email);

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        db = getDB();

        // // 1. Check if user exists in the `users` table (or change to your actual table)
        const users = await queryDB(db, 'SELECT * FROM user_role WHERE user_email = ?', [email]);
        if (users.length === 0) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        // 2. Generate a secure token
        const sessionKey = crypto.randomUUID().substring(0, 8);  // ✅ now works

        await runDB(db, 'UPDATE user_role SET key = ? WHERE user_email = ?', [sessionKey, email]);

        console.log("Generated session key:", sessionKey);

        const resend = new Resend('re_PsAYDRvD_4bP8BwQPrCpxqvvWGVifLPaC');

        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'antoinefaith1@gmail.com',
            subject: 'Your Login Token',
            html: `<p>Congrats on sending your <strong>${sessionKey}</strong>!</p>`
        });

        return NextResponse.json({
            success: true,
            message: 'Token sent to your email',
        }, { status: 200 });

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        if (db) {
            db.close((err) => {
                if (err) console.error('Error closing database:', err);
            });
        }
    }
}