/**
 * Small helper to look up the Google Place ID for the resort.
 *
 *   npm run place-id
 *   npm run place-id -- "Jade River Resort Pahalgam"
 *
 * Requires GOOGLE_PLACES_API_KEY in .env.local with Places API (New) enabled.
 */
const key = process.env.GOOGLE_PLACES_API_KEY;

if (!key) {
  console.error(
    "Missing GOOGLE_PLACES_API_KEY. Add it to .env.local, then run this again.",
  );
  process.exit(1);
}

const query = process.argv.slice(2).join(" ").trim() || "Jade River Resort Pahalgam";

const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": key,
    "X-Goog-FieldMask":
      "places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.googleMapsUri",
  },
  body: JSON.stringify({ textQuery: query }),
});

if (!res.ok) {
  console.error(`Places API returned ${res.status}`);
  console.error(await res.text());
  process.exit(1);
}

const data = await res.json();
const places = data.places ?? [];

if (places.length === 0) {
  console.log(`No places matched "${query}".`);
  process.exit(0);
}

for (const place of places) {
  console.log("");
  console.log(place.displayName?.text ?? "(unnamed place)");
  console.log(`  Place ID : ${place.id}`);
  console.log(`  Address  : ${place.formattedAddress ?? "—"}`);
  console.log(
    `  Rating   : ${place.rating ?? "—"} (${place.userRatingCount ?? 0} reviews)`,
  );
  console.log(`  Maps     : ${place.googleMapsUri ?? "—"}`);
}

console.log("");
console.log("Add the matching Place ID to .env.local as GOOGLE_PLACE_ID.");
