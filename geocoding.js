//  Copyright (c) 2024 YA All rights reserved.


const reverseGeocodingLite = async (lat, lon) => {
    const sqlPromise = initSqlJs({
        locateFile: file => `https://sql.js.org/dist/${file}`
    });
    const dataPromise = fetch("geocoding.db").then(res => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
    const db = new SQL.Database(new Uint8Array(buf));

    const stmt = db.prepare(" SELECT * , ( abs ( $lat - 緯度 ) + abs ( $lon - 経度 ) ) as d FROM town ORDER BY d ASC LIMIT 1 ; ");
    const result = stmt.getAsObject({ $lat: lat, $lon: lon });

    console.log({ result });
    return result;
};
