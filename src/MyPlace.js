import { Map } from './UI/Map';

class LoadedPlace {
    constructor(coordinates, address) {
        const headerTitleEl = document.querySelector('header h1');
        headerTitleEl.textContent = address;
        new Map(coordinates);
    }
}

const url = new URL(location.href);
const queryParams = url.searchParams;

const locId = queryParams.get('location');
fetch('http://localhost:3000/location/' + locId)
    .then((response) => {
        if (response.status === 404) {
            throw new Error('Could not find location!');
        }
        return response.json();
    })
    .then((data) => {
        new LoadedPlace(
            [data.coorditates.lat, data.coorditates.lng],
            data.address
        );
    })
    .catch((err) => {
        alert(err.message);
    });
