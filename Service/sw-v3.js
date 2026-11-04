const CACHE_NAME = "my-web-cache-v1";

// ===================================
// เพิ่มไฟล์ใหม่ตรงนี้ได้เลย
// ===================================
const FILES = [
  "/",
  "/index.html",

  // เพิ่มไฟล์ใหม่ต่อจากนี้
  "/Audio/Thai Alphabets/ก.m4a",
  "/Audio/Thai Alphabets/ข.m4a",
  "/Audio/Thai Alphabets/ฃ.m4a",
  "/Audio/Thai Alphabets/ค.m4a",
  "/Audio/Thai Alphabets/ฅ.m4a",
  "/Audio/Thai Alphabets/ฆ.m4a",
  "/Audio/Thai Alphabets/ง.m4a",
  "/Audio/Thai Alphabets/จ.m4a",
  "/Audio/Thai Alphabets/ฉ.m4a",
  "/Audio/Thai Alphabets/ช.m4a",
  "/Audio/Thai Alphabets/ซ.m4a",
  "/Audio/Thai Alphabets/ฌ.m4a",
  "/Audio/Thai Alphabets/ญ.m4a",
  "/Audio/Thai Alphabets/ฎ.m4a",
  "/Audio/Thai Alphabets/ฏ.m4a",
  "/Audio/Thai Alphabets/ฐ.m4a",
  "/Audio/Thai Alphabets/ฑ.m4a",
  "/Audio/Thai Alphabets/ฒ.m4a",
  "/Audio/Thai Alphabets/ณ.m4a",
  "/Audio/Thai Alphabets/ด.m4a",
  "/Audio/Thai Alphabets/ต.m4a",
  "/Audio/Thai Alphabets/ถ.m4a",
  "/Audio/Thai Alphabets/ท.m4a",
  "/Audio/Thai Alphabets/ธ.m4a",
  "/Audio/Thai Alphabets/น.m4a",
  "/Audio/Thai Alphabets/บ.m4a",
  "/Audio/Thai Alphabets/ป.m4a",
  "/Audio/Thai Alphabets/ผ.m4a",
  "/Audio/Thai Alphabets/ฝ.m4a",
  "/Audio/Thai Alphabets/พ.m4a",
  "/Audio/Thai Alphabets/ฟ.m4a",
  "/Audio/Thai Alphabets/ภ.m4a",
  "/Audio/Thai Alphabets/ม.m4a",
  "/Audio/Thai Alphabets/ย.m4a",
  "/Audio/Thai Alphabets/ร.m4a",
  "/Audio/Thai Alphabets/ล.m4a",
  "/Audio/Thai Alphabets/ว.m4a",
  "/Audio/Thai Alphabets/ศ.m4a",
  "/Audio/Thai Alphabets/ษ.m4a",
  "/Audio/Thai Alphabets/ส.m4a",
  "/Audio/Thai Alphabets/ห.m4a",
  "/Audio/Thai Alphabets/ฬ.m4a",
  "/Audio/Thai Alphabets/อ.m4a",
  "/Audio/Thai Alphabets/ฮ.m4a",

  "/Audio/สระไทย/ะ.m4a",
  "/Audio/สระไทย/า.m4a",
  "/Audio/สระไทย/อิ.m4a",
  "/Audio/สระไทย/อี.m4a",
  "/Audio/สระไทย/อึ.m4a",
  "/Audio/สระไทย/อื.m4a",
  "/Audio/สระไทย/อุ.m4a",
  "/Audio/สระไทย/อู.m4a",
  "/Audio/สระไทย/เะ.m4a",
  "/Audio/สระไทย/เ.m4a",
  "/Audio/สระไทย/แะ.m4a",
  "/Audio/สระไทย/แ.m4a",
  "/Audio/สระไทย/โะ.m4a",
  "/Audio/สระไทย/โ.m4a",
  "/Audio/สระไทย/เ าะ.m4a",
  "/Audio/สระไทย/ิออ.m4a",
  "/Audio/สระไทย/อัวะ.m4a",
  "/Audio/สระไทย/อัว.m4a",
  "/Audio/สระไทย/เอียะ.m4a",
  "/Audio/สระไทย/เอีย.m4a",
  "/Audio/สระไทย/เอือะ.m4a",
  "/Audio/สระไทย/เออ.m4a",
  "/Audio/สระไทย/อำ.m4a",
  "/Audio/สระไทย/ใ.m4a",
  "/Audio/สระไทย/ไ.m4a",
  "/Audio/สระไทย/เ า.m4a",
  "/Audio/สระไทย/ฤ.m4a",
  "/Audio/สระไทย/ฤา.m4a",
  "/Audio/สระไทย/ฦ.m4a",
  "/Audio/สระไทย/ฦา.m4a",
];

// ===================================
// ตั้งค่า
// ===================================
const BATCH_SIZE = 1;

// ป้องกันการทำงานซ้อนใน SW instance เดียว
let queueRunning = false;

async function precacheFiles() {
  if (queueRunning) return true;

  queueRunning = true;

  let failed = false;

  try {
    const cache = await caches.open(CACHE_NAME);

    // ทำงานทีละไฟล์ตามลำดับ
    for (const file of FILES) {
      try {
        // มีไฟล์แล้วก็ข้าม
        const existing = await cache.match(file);

        if (existing) continue;

        console.log("[SW] Downloading:", file);

        const response = await fetch(file, {
          cache: "reload",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        await cache.put(file, response);

        console.log("[SW] Saved:", file);
      } catch (error) {
        failed = true;
        console.warn("[SW] Failed:", file, error);

        // ข้ามไปไฟล์ถัดไป ไม่หยุดทั้ง Queue
      }
    }
  } finally {
    queueRunning = false;
  }

  return !failed;
}

// ===================================
// Install
// ===================================
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

// ===================================
// Activate
// ===================================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      await precacheFiles();
    })(),
  );
});

// ===================================
// Background Sync
// ===================================
self.addEventListener("sync", (event) => {
  if (event.tag === "precache-retry") {
    event.waitUntil(
      (async () => {
        const success = await precacheFiles();

        if (!success) {
          // แจ้ง browser ว่ายังมีไฟล์ที่ต้องลองใหม่
          throw new Error("Some files failed to download");
        }
      })(),
    );
  }
});

// ===================================
// Fetch
// ===================================
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      const cached = await cache.match(request);

      if (cached) return cached;

      try {
        const response = await fetch(request);

        if (response.ok) {
          await cache.put(request, response.clone());
        }

        return response;
      } catch (error) {
        return new Response("Offline - File unavailable", {
          status: 503,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }
    })(),
  );

  // ใช้ช่วงที่มีการใช้งานเว็บไซต์
  // เป็นโอกาสให้ลองดาวน์โหลดไฟล์ที่เหลือ
  event.waitUntil(
    precacheFiles().then(async (success) => {
      if (!success && self.registration.sync) {
        try {
          await self.registration.sync.register("precache-retry");
        } catch (error) {
          console.warn("[SW] Sync registration failed:", error);
        }
      }
    }),
  );
});
