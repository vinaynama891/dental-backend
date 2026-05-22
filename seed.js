/**
 * Seed script — creates the fixed Doctor and Receptionist accounts.
 * Run once: node seed.js
 */
import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/dentique";

const seeds = [
  {
    name: "Dr. Smith",
    email: "doctor@gmail.com",
    password: "Doctor@20",
    role: "doctor",
    phone: "+91 98765 00001",
  },
  {
    name: "Reception Desk",
    email: "recp@gmail.com",
    password: "Recp@20",
    role: "receptionist",
    phone: "+91 98765 00002",
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");

  for (const s of seeds) {
    const existing = await User.findOne({ email: s.email });
    if (existing) {
      console.log(`⚠️  ${s.email} already exists — skipping`);
      continue;
    }
    await User.create(s);
    console.log(`✅ Created ${s.role}: ${s.email}`);
  }

  await mongoose.disconnect();
  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed error:", err.message);
  process.exit(1);
});
