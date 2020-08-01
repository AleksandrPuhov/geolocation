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

const coords = [+queryParams.get('lat'), +queryParams.get('lng')];
const address = queryParams.get('address');

new LoadedPlace(coords, address);
