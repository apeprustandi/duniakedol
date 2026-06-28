const { neon } = require("@neondatabase/serverless");

async function migrate() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    // Drop otp_codes
    await sql`DROP TABLE IF EXISTS otp_codes;`;
    console.log("Dropped otp_codes table");

    // Alter users table
    // Rename full_name to name if full_name exists, if not maybe it's already name
    try {
        await sql`ALTER TABLE users RENAME COLUMN full_name TO name;`;
        console.log("Renamed full_name to name");
    } catch (e) {
        console.log("Column full_name might not exist or already renamed to name. Error: " + e.message);
    }
    
    // Add google_id
    try {
        await sql`ALTER TABLE users ADD COLUMN google_id TEXT UNIQUE;`;
        console.log("Added google_id column");
    } catch (e) {
        console.log("Column google_id might already exist. Error: " + e.message);
    }

    // Add picture_url
    try {
        await sql`ALTER TABLE users ADD COLUMN picture_url TEXT;`;
        console.log("Added picture_url column");
    } catch (e) {
        console.log("Column picture_url might already exist. Error: " + e.message);
    }
    
    console.log("Migration complete");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();
