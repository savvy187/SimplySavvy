import React from 'react';
import PropTypes from 'prop-types';
import { useTrail, animated } from 'react-spring';

const TrailAnimation = ({ from, to, config, children, forceBlock=false }) => {
    /* 
     * We'll need to convert the chiildren to an array to apply
     * staggered effects to the members...
    */
    const childrenArray = React.Children.toArray(children);
    /* 
     * Setting up the useTrail animation with the supplied 
     * config, from and to...
    */
    const trail = useTrail(childrenArray.length, {
        config,
        from: { ...from },
        to: { ...to }
    });
    
    return (
        <div>
            {
                trail.map((styles, index) => (                                        
                    forceBlock
                        ? (
                            <animated.div
                                key={`animated-div-${index}`}
                                style={{ ...styles }}>
                                {childrenArray[index]}
                            </animated.div>
                        )
                        : (
                            <animated.span
                                key={`animated-span-${index}`}
                                style={{ ...styles }}
                            >
                                {childrenArray[index]}
                            </animated.span>
                        )                    
                ))
            }
        </div>
    );
};

TrailAnimation.propTypes = {
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    config: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    forceBlock: PropTypes.bool
};

export default TrailAnimation;
