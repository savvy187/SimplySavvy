import React, { useMemo, useContext } from 'react';
import _ from 'lodash';
import { NetworkContext } from 'contexts/network/network.context';
import { useScrollToHash } from 'hooks';
import { Links } from 'components';

const { HashAnchor } = Links;

function useArticleSectionsNavigation({ location, routeMatch }) {    
    const { selector } = useContext(NetworkContext);    
    
    const articleSections = selector({
        stateKey: `requests['/api/articles/${routeMatch.params.id}']`,
        defaultValue: [],
        transformer: (article) => {
            const sections = _.get(article, 'data.sections', []);
            return _.map(sections, 'title');
        }
    });

    useScrollToHash({ 
        idPrefix: 'section-navigation__'
    });


    return useMemo(() => {                
        const hash = location.hash.substr(1);

        return _.map(articleSections, (sectionTitle) => {
            const hashTitle = _.snakeCase(sectionTitle);
            return (
                <HashAnchor
                    key={hashTitle}
                    displayAs="NavAnchor"
                    id={`section-navigation__${hashTitle}`}
                    hash={hashTitle}
                    isActive={hash === hashTitle}
                >
                    {sectionTitle}
                </HashAnchor>
            );
        });
    }, [articleSections, location.hash]);
}

export default useArticleSectionsNavigation;
