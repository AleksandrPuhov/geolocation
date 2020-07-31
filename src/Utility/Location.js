const API_KEY = '7f64caeb-71c0-440a-a6e2-4ffdaa8d1f23';

export async function getAddressFromCoords(coords) {
    const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=${API_KEY}&geocode=${coords[1]},${coords[0]}`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch address.');
    }
    const data = await response.json();
    if (data.error) {
        throw new Error(data.message);
    }
    const address =
        data.response.GeoObjectCollection.featureMember[0].GeoObject
            .metaDataProperty.GeocoderMetaData.text;
    return address;
}

export async function getCoordsFromAddress(address) {
    const urlAddress = encodeURI(address);
    const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&lang=en_US&apikey=${API_KEY}&geocode=${urlAddress}`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch coordinates.');
    }
    const data = await response.json();
    if (data.error) {
        throw new Error(data.message);
    }
    const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
        .split(' ')
        .map((i) => parseFloat(i))
        .reverse();
    return coordinates;
}
