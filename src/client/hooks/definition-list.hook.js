import React, { useMemo } from 'react';
import _ from 'lodash';

function useDefinitionList(listHeading, listItems=[]) {
    return useMemo(() => {
        return !_.isEmpty(listItems)
            ? (
                <dl>
                    <dt>{listHeading}</dt>
                    {
                        _.map(listItems, (i) => (
                            <dd key={i}>{i}</dd>
                        ))
                    }
                </dl>
            )
            : null;
    }, [listHeading, listItems]);
}

export default useDefinitionList;
