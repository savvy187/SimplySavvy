import React, { useMemo, useContext } from 'react';
import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import { NetworkContext } from 'contexts/network/network.context';
import { Links } from 'components';

const { NavAnchor } = Links;

function useArticleSectionsNavigation() {
    const { hash } = useLocation();
    const { id } = useParams();
    const { selector } = useContext(NetworkContext);    
    const articleSections = selector({
        stateKey: `requests['/api/articles/${id}']`,
        defaultValue: [],
        transformer: (article) => {
            //console.log('article: ', article);
            /* _.map(article, (a) => {
                return _.flatMap(a.section, 'title');
            }); */
        }
    });
    //console.log(selector({}));

    return useMemo(() => {
        return _.map(articleSections, (sectionTitle) => {
            const hashTitle = _.snakeCase(sectionTitle);
            return (
                <NavAnchor
                    to={{ hash: hashTitle }}
                    className={hash === hashTitle ? 'active' : ''}
                >
                    {sectionTitle}
                </NavAnchor>
            );
        });
    }, [articleSections]);
}

export default useArticleSectionsNavigation;
