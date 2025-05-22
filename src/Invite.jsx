import React, { useEffect, useState } from "react"
import './Invite.css'
import { Link } from "react-router-dom"
import ImageMapper from 'react-img-mapper'
import { useRef } from "react";

function Invite() {
    const containerRef = useRef(null); 
    const [parentWidth, setParentWidth] = useState(0);

    const mapAreas = [{
        "id": "1",
        "title": "About",
        "shape": "square",
        "name": "1",
        "href": "/about",
        "coords": [
            51,517,153,550
        ],
      },
      {
        "id": "2",
        "title": "Gallery",
        "shape": "square",
        "name": "2",
        "href": "/gallery",
        "coords": [
            228,514,341,551
        ],
      },
      {
        "id": "3",
        "title": "Contact",
        "shape": "square",
        "name": "3",
        "href": "/contact",
        "coords": [
            381,515,509,549
        ],
      }
    ];

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setParentWidth(containerRef.current.offsetWidth);
            }
        }
        updateWidth();
        const resizeObserver = new ResizeObserver(() => {
            updateWidth();
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        }
    }, []);

    return (
        <div className="invite-container-container">
            <div className="invite-container" ref={containerRef}>
                {parentWidth > 0 && (
                <ImageMapper src="invitationn.png" name="invitation-map" className="invite-image" areas={mapAreas} responsive={true} parentWidth={parentWidth}/>
                )}
            </div>
        </div>
    )
}

export default Invite;