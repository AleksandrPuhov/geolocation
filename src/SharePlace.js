import { Modal } from './UI/Modal';
import { Map } from './UI/Map';

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');

        locateUserBtn.addEventListener(
            'click',
            this.locateUserHandler.bind(this)
        );
        addressForm.addEventListener('submit', this.findAdressHandler);
    }

    selectPlace(coordinates) {
        if (this.map) {
            this.map.destroy();
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert('Location feature is not available in your browser');
            return;
        }

        const modal = new Modal(
            'loading-modal-content',
            'Loading location - please wait!'
        );

        modal.show();

        navigator.geolocation.getCurrentPosition(
            (successResult) => {
                modal.hide();
                const coordinates = [
                    successResult.coords.latitude,
                    successResult.coords.longitude,
                ];
                console.log(coordinates);
                this.selectPlace(coordinates);
            },
            (error) => {
                modal.hide();
                alert('Could not locate you unfortunately');
            }
        );
    }

    findAdressHandler() {}
}

const placeFinder = new PlaceFinder();
