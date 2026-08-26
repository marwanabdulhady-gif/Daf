const fs = require("fs");
const p = "roster.json";
const r = JSON.parse(fs.readFileSync(p, "utf8"));
const MAP = {
  "Layla Al-Harbi": "Abdullah Al-Harbi", "Salma Al-Ghamdi": "Bandar Al-Ghamdi",
  "Reem Al-Sudairi": "Fares Al-Sudairi", "Sana Al-Amoudi": "Ghazi Al-Amoudi",
  "Noura Al-Qahtani": "Hisham Al-Qahtani", "Hala Bin Mahfouz": "Hudayfair Bin Mahfouz",
  "Jana Al-Shaikh": "Jareer Al-Shaikh", "Maryam Al-Juffali": "Laith Al-Juffali",
  "Dana Al-Rashid": "Majid Al-Rashid", "Lina Al-Sabban": "Manan Al-Sabban",
  "Aseel Al-Barrak": "Musab Al-Barrak", "Rana Al-Fadl": "Nizar Al-Fadl",
  "Talia Al-Hazmi": "Obaid Al-Hazmi", "Shahd Al-Nemer": "Sami Al-Nemer",
  "Ghala Al-Aqeel": "Sattam Al-Aqeel", "Rimas Al-Zamil": "Shuraym Al-Zamil",
  "Yara Al-Bassam": "Tawfiq Al-Bassam", "Leen Al-Shammari": "Ubaid Al-Shammari",
  "Haya Al-Faraj": "Yazan Al-Faraj", "Retaj Al-Ghurair": "Zaher Al-Ghurair",
  "Deem Al-Marzouq": "Hanzala Al-Marzouq", "Alia Al-Rowais": "Khalifa Al-Rowais",
  "Basma Al-Nafisi": "Sayer Al-Nafisi"
};
let n = 0;
for (const section of Object.values(r.sections)) {
  for (let i = 0; i < section.length; i++) {
    if (MAP[section[i]]) { console.log(section[i], "→", MAP[section[i]]); section[i] = MAP[section[i]]; n++; }
  }
}
fs.writeFileSync(p, JSON.stringify(r, null, 2) + "\n");
console.log("renamed:", n);
