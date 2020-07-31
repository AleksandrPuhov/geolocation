import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        locateUserBtn.addEventListener(
            'click',
            this.locateUserHandler.bind(this)
        );
        addressForm.addEventListener(
            'submit',
            this.findAdressHandler.bind(this)
        );
        //this.shareBtn.addEventListener('click');
    }

    selectPlace(coordinates, address) {
        if (this.map) {
            this.map.destroy();
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }
        this.shareBtn.disabled = false;
        const sharedLinkInputEl = document.getElementById('share-link');
        sharedLinkInputEl.value = `${
            location.origin
        }/my-place?address=${encodeURI(address)}&lat=${coordinates[0]}&lon=${
            coordinates[1]
        }`;
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
            async (successResult) => {
                const coordinates = [
                    successResult.coords.latitude,
                    successResult.coords.longitude,
                ];
                const address = await getAddressFromCoords(coordinates);
                modal.hide();
                this.selectPlace(coordinates, address);
            },
            (error) => {
                modal.hide();
                alert('Could not locate you unfortunately');
            }
        );
    }

    async findAdressHandler(event) {
        event.preventDefault();
        const address = event.target.querySelector('input').value;
        if (!address || address.trim().length === 0) {
            alert('Invalid address entered');
            return;
        }
        const modal = new Modal(
            'loading-modal-content',
            'Loading location - please wait!'
        );

        modal.show();

        try {
            const coordinates = await getCoordsFromAddress(address);
            const addressFull = await getAddressFromCoords(coordinates);
            this.selectPlace(coordinates, addressFull);
        } catch (error) {
            alert(error.message);
        }
        modal.hide();
    }
}

const placeFinder = new PlaceFinder();
