"use client"
import { useCallback, useEffect, useState } from "react";
import { CreateRouteSideBar } from "@/components/route/route-sidebar";
import { APIProvider, Map, MapCameraChangedEvent, MapMouseEvent } from '@vis.gl/react-google-maps';
import { cn } from "@/lib/utils";
import axios from "axios"
const RoutesCreatePage = () => {
    const [map,setMap] = useState<google.maps.Map | null>(null)
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [markers, setMarkers] = useState<google.maps.marker.AdvancedMarkerElement[]>([]);
    const createMark = (color: string, borderColor: string) => {
        const div = document.createElement('div');
        div.style.backgroundColor = color;
        div.style.borderColor = borderColor;
        div.style.border = '1px solid'; // Ensure the border style is included
        div.style.width = '17px';
        div.style.height = '17px';
        div.style.borderRadius = '50%';
        div.style.cursor = 'pointer';
        return div;
    };

    const getRoute = useCallback(async () => {
        const startMarker = markers[0];
        const startLocation = {
            
                latitude:startMarker.position?.lat,
                longitude:startMarker.position?.lng
            
        } 
        const endMarker = markers[markers.length-1];
        const endLocation = {
            
                latitude:endMarker.position?.lat,
                longitude:endMarker.position?.lng
            
        }
        const waypoints = [];
        for (let i = 1; i < markers.length - 1; i++){
            let intermediateLocation = {
                location:{
                 latLng:{
                    latitude: markers[i].position?.lat,
                    longitude: markers[i].position?.lng
                  }
                }
            }
            waypoints.push(intermediateLocation);

        }
        const data =  {
            origin: {
                location: {
                    latLng: startLocation
                }
            },
            destination: {
                location: {
                    latLng: endLocation
                }
            },
            intermediates:waypoints,
            travelMode: "DRIVE"
        }
        try {
            const res = await axios.post("https://routes.googleapis.com/directions/v2:computeRoutes", JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-FieldMask': 'routes.legs,routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
                    "X-Goog-Api-Key": "AIzaSyBliYIxXidvgPmZq29qiwo_r5E2dvqChZs"
                }
            });
            const { encoding }: any = await google.maps.importLibrary("geometry")
            const decodePath = encoding.decodePath(res.data.routes[0].polyline.encodedPolyline)
            console.log(decodePath)
            console.log(res.data.routes[0])
            const { Polyline }: any = await google.maps.importLibrary("maps")
            const polyline = new Polyline({
                path: decodePath,
                strokeColor: "#FF0000",
                strokeWeight: 2,
                map:map
            })
            
        }
        catch (e) {
            console.log(e)
        }
    },[markers,map])
    const handleMapClick = async (e: MapMouseEvent) => {
        console.log(e);
        const latLng = e.detail.latLng;
        if (latLng) {
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
            const marker = new AdvancedMarkerElement({
                position: latLng,
                map: e.map,// Ensure the border color is set to white
                gmpClickable:true
            });
            const newMarkers = [...markers, marker];
            for (let i = 0; i < newMarkers.length;i++) {
                if (i == 0) {
                    newMarkers[i].content = createMark('green', 'white');
                    newMarkers[i].title = "Start point on the Map";
                }
                else if (i == newMarkers.length - 1) {
                    newMarkers[i].content = createMark('red', 'pink');
                    newMarkers[i].title = "End point on the Map";
                }
                else {
                    newMarkers[i].content = createMark('white', 'red');
                    newMarkers[i].title = "Segment point on the Map";    
                }
            }
            setMarkers(newMarkers);
            setMap(e.map);
            console.log('Coordinates:', latLng.lat, latLng.lng);
        }
    };
    useEffect(() => {
        if (markers.length > 1) {
            getRoute();
        }
    },[markers,getRoute])
    return (
        <div className="flex">
            <div className={cn("z-10 relative", sidebarOpen && "w-0")}>
                <CreateRouteSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <div className={cn("map h-[540px] w-full", sidebarOpen && "")}>
                <APIProvider apiKey={process.env.NEXT_PUBLIC_KEY || ""} onLoad={() => console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)}>
                    <Map
                        
                        onClick={(e) => handleMapClick(e)}
                        defaultZoom={13}
                        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
                        onCameraChanged={(ev: MapCameraChangedEvent) =>
                            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                        }
                        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    >
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
};

export default RoutesCreatePage;
