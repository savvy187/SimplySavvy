import { useEffect, useState } from 'react';
import _ from 'lodash';

export default function useSendBeacon(initialBeacons=[]) {
    const [beacons, setBeacons] = useState(initialBeacons);

    const addBeacons = (beaconsToAdd) => setBeacons(_.concat(beacons, beaconsToAdd));
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
            _.each(beacons, (beacon) => {
                const { url, data } = beacon;
                /* 
                 * TODO: Supply state and selector...
                */
                navigator.sendBeacon(url, data);
            });
        };

        window.addEventListener('unload', flushAllBeacons);

        return () => window.removeEventListener('unload', flushAllBeacons);
    }, []);

    return [addBeacons, removeBeacons];
}
