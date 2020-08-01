export class Map {
    constructor(coords) {
        this.coordinates = coords;
        this.render(coords);
    }

    destroy() {
        this.map.destroy();
        this.map = null;
    }

    render(coordinates) {
        if (!ymaps) {
            alert('Could not load maps library');
            return;
        }

        const mapEl = document.getElementById('map');
        const pEl = mapEl.querySelector('p');
        if (pEl) {
            mapEl.removeChild(pEl);
        }

        ymaps.ready(() => {
            this.map = new ymaps.Map('map', {
                center: coordinates,
                zoom: 15,
            });

            if (this.map) {
                this.map.geoObjects.add(
                    new ymaps.Placemark(coordinates, {
                        preset: 'islands#icon',
                        iconColor: '#0095b6',
                    })
                );
            }
        });
    }
}
