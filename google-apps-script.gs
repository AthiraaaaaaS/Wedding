var SHEET_NAME = "RSVP Responses";
var VEG_HEADER = "Veg count";
var NONVEG_HEADER = "Non veg count";

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = findResponseSheet_(ss);
  var headers = readHeaders_(sheet);

  if (headers.length === 0) {
    headers = [
      "timestamp",
      "name",
      "phone",
      "wedding",
      "reception",
      "count",
      "adults",
      "children",
      VEG_HEADER,
      NONVEG_HEADER,
      "note",
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else {
    headers = ensureCountHeaders_(sheet, headers);
  }

  sheet.appendRow(
    headers.map(function (header) {
      return valueForHeader_(header, data);
    })
  );

  return ContentService.createTextOutput("ok");
}

function findResponseSheet_(ss) {
  var named = ss.getSheetByName(SHEET_NAME);
  if (named) return named;

  var sheets = ss.getSheets();
  for (var i = 0; i < sheets.length; i++) {
    var joined = readHeaders_(sheets[i]).join(" ").toLowerCase();
    if (joined.indexOf("name") !== -1 && (joined.indexOf("wedding") !== -1 || joined.indexOf("phone") !== -1)) {
      return sheets[i];
    }
  }
  return sheets[0];
}

function readHeaders_(sheet) {
  if (sheet.getLastRow() === 0) return [];
  var width = Math.max(sheet.getLastColumn(), 1);
  return sheet
    .getRange(1, 1, 1, width)
    .getValues()[0]
    .filter(function (cell) {
      return String(cell).trim() !== "";
    });
}

function ensureCountHeaders_(sheet, headers) {
  var needed = [
    { title: VEG_HEADER, match: isVegHeader_ },
    { title: NONVEG_HEADER, match: isNonVegHeader_ },
  ];
  needed.forEach(function (item) {
    var found = headers.some(function (header) {
      return item.match(normalizeHeader_(header));
    });
    if (!found) {
      headers.push(item.title);
      sheet.getRange(1, headers.length).setValue(item.title);
    }
  });
  return headers;
}

function normalizeHeader_(header) {
  return String(header).toLowerCase().replace(/\s+/g, " ").trim();
}

function isVegHeader_(name) {
  return name === "veg" || name === "veg count" || name === "veg guests";
}

function isNonVegHeader_(name) {
  return (
    name === "nonveg" ||
    name === "non veg" ||
    name === "non veg count" ||
    name === "non-veg" ||
    name === "non veg guests"
  );
}

function valueForHeader_(header, data) {
  var key = normalizeHeader_(header);
  if (isVegHeader_(key)) return data.veg || "";
  if (isNonVegHeader_(key)) return data.nonveg || "";

  var values = {
    timestamp: new Date(),
    time: new Date(),
    date: new Date(),
    submitted: new Date(),
    name: data.name || "",
    "your name": data.name || "",
    phone: data.phone || "",
    "phone number": data.phone || "",
    wedding: data.wedding || "",
    reception: data.reception || "",
    count: data.count || "",
    guests: data.count || "",
    adults: data.adults || "",
    children: data.children || "",
    note: data.note || "",
    message: data.note || "",
  };

  if (Object.prototype.hasOwnProperty.call(values, key)) return values[key];
  if (Object.prototype.hasOwnProperty.call(data, header)) return data[header];
  if (Object.prototype.hasOwnProperty.call(data, key)) return data[key];
  return "";
}
