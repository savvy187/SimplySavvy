import { useEffect, useState } from 'react';
import _ from 'lodash';

export default function useSendBeacon(initialBeacons=[]) {
    const [beacons, setBeacons] = useState(initialBeacons);

    const addBeacons = (beaconsToAdd) => setBeacons(beacons.concat(beaconsToAdd));
    const removeBeacons = (index, count) => {
        
        if (!_.isNil(index) & !_.isNil(count)) {
            beacons.splice(index, count);
            setBeacons(beacons);
        } else {
            setBeacons([]);
        }
    };

    useEffect(() => {

        const flushAllBeacons = () => {
            beacons.forEach((beacon) => {
                const { url, stateKey } = beacon;
                /* 
                 * TODO: Supply state and selector...
                */
                navigator.sendBeacon(url, stateKey);
            });
        };

        window.addEventListener('unload', flushAllBeacons);

        return () => window.removeEventListener('unload', flushAllBeacons);
    }, []);

    return [addBeacons, removeBeacons];
}
