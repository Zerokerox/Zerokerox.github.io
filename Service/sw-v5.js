// make it receiver range request
const CACHE_NAME = "my-web-cache-v9";

// ===================================
// รายการไฟล์ Pre-cache
// ===================================
const FILES = [
  "/",
  "/index.html",

  // Thai Alphabets
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

  // Thai Vowels
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
// Pre-cache Queue
// ===================================
let queueRunning = false;

async function precacheFiles() {
  if (queueRunning) return true;

  queueRunning = true;
  let failed = false;

  try {
    const cache = await caches.open(CACHE_NAME);

    for (const file of FILES) {
      try {
        const existing = await cache.match(file);

        if (existing) continue;

        console.log("[SW] Downloading:", file);

        const response = await fetch(file, {
          cache: "reload",
        });

        if (!response.ok || response.type !== "basic") {
          throw new Error(`Invalid response: ${response.status}`);
        }

        await cache.put(file, response);

        console.log("[SW] Saved:", file);
      } catch (error) {
        failed = true;
        console.warn("[SW] Failed:", file, error);
      }
    }
  } finally {
    queueRunning = false;
  }

  return !failed;
}

// ===================================
// Range Request Parser
// ===================================
function parseRange(rangeHeader, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader || "");

  if (!match) return null;

  let start;
  let end;

  if (match[1] === "" && match[2] === "") {
    return null;
  }

  if (match[1] === "") {
    const suffixLength = Number(match[2]);

    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) {
      return null;
    }

    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === "" ? size - 1 : Number(match[2]);

    if (
      !Number.isSafeInteger(start) ||
      !Number.isSafeInteger(end) ||
      start > end ||
      start >= size
    ) {
      return null;
    }

    end = Math.min(end, size - 1);
  }

  return { start, end };
}

// ===================================
// สร้าง Partial Content Response
// ===================================
async function createRangeResponse(response, rangeHeader) {
  const blob = await response.blob();
  const size = blob.size;

  const range = parseRange(rangeHeader, size);

  if (!range) {
    return new Response(null, {
      status: 416,
      headers: {
        "Content-Range": `bytes */${size}`,
        "Accept-Ranges": "bytes",
      },
    });
  }

  const { start, end } = range;

  const partialBlob = blob.slice(start, end + 1);

  const headers = new Headers(response.headers);

  headers.set(
    "Content-Type",
    response.headers.get("Content-Type") || "application/octet-stream",
  );
  headers.set("Content-Length", String(partialBlob.size));
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Accept-Ranges", "bytes");

  headers.delete("Content-Encoding");
  headers.delete("Content-Length-Original");

  return new Response(partialBlob, {
    status: 206,
    statusText: "Partial Content",
    headers,
  });
}

// ===================================
// Fetch Handler
// ===================================
async function handleRequest(request) {
  const cache = await caches.open(CACHE_NAME);

  const cached = await cache.match(request, {
    ignoreVary: false,
  });

  // -------------------------------
  // Cache Hit
  // -------------------------------
  if (cached) {
    if (request.headers.has("Range")) {
      return createRangeResponse(cached, request.headers.get("Range"));
    }

    return cached;
  }

  // -------------------------------
  // Cache Miss
  // -------------------------------
  try {
    // ดาวน์โหลดไฟล์เต็ม ไม่ใช้ Range จาก Browser
    const fullRequest = new Request(request.url, {
      method: "GET",
      headers: new Headers(
        [...request.headers].filter(([key]) => key.toLowerCase() !== "range"),
      ),
      credentials: request.credentials,
      mode: request.mode,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      cache: "no-cache",
    });

    const response = await fetch(fullRequest);

    if (!response.ok || response.type !== "basic") {
      return response;
    }

    // เก็บ Response เต็มไว้ใน Cache
    await cache.put(request.url, response.clone());

    // ถ้า Browser ต้องการ Range ให้สร้าง 206
    if (request.headers.has("Range")) {
      return createRangeResponse(response, request.headers.get("Range"));
    }

    return response;
  } catch (error) {
    console.warn("[SW] Offline:", request.url);

    return new Response("Offline - File unavailable", {
      status: 503,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}

// ===================================
// Install
// ===================================
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

// ===================================
// Activate + Cache Version
// ===================================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      // ลบ Cache เก่าเฉพาะ namespace ของแอปนี้
      await Promise.all(
        cacheNames.map((name) => {
          if (name.startsWith("my-web-cache-") && name !== CACHE_NAME) {
            console.log("[SW] Delete:", name);
            return caches.delete(name);
          }
        }),
      );

      await self.clients.claim();

      const success = await precacheFiles();

      if (!success && self.registration.sync) {
        try {
          await self.registration.sync.register("precache-retry");
        } catch (error) {
          console.warn("[SW] Sync registration failed:", error);
        }
      }

      console.log("[SW] Activated:", CACHE_NAME);
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
          throw new Error("Pre-cache incomplete");
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

  // รองรับ GET ปกติ และ Range GET
  event.respondWith(handleRequest(request));

  // ลองเติมไฟล์ Pre-cache ที่ยังขาด
  event.waitUntil(
    (async () => {
      const success = await precacheFiles();

      if (!success && self.registration.sync) {
        try {
          await self.registration.sync.register("precache-retry");
        } catch (error) {
          console.warn("[SW] Sync registration failed:", error);
        }
      }
    })(),
  );
});
