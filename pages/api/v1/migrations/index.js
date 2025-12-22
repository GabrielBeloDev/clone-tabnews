import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(req, res) {
    if (req.method !== "GET" && req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const migrations = await migrationRunner({
        databaseUrl: process.env.DATABASE_URL,
        dryRun: req.method === "GET",
        dir: join("infra", "migrations"),
        direction: "up",
        verbose: true,
        migrationsTable: "pgmigrations",
    });

    res.status(200).json(migrations);
}
