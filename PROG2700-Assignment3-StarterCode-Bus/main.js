(function(){
 
    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([44.650627, -63.597140], 14);
    
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
 
        let busIcon = L.icon({
            iconUrl: "bus.png",
            iconSize: [22, 20]
        });
        let busSmallIcon = L.icon({
            iconUrl: 'bus.png',
            iconSize: [30]
        });

        
    let busLayer = L.layerGroup().addTo(map);


    
    
    const Buses = async function() {
         fetch('https://hrmbusapi.herokuapp.com/')
        .then(function(response){ 
            return response.json()
        })
        .then(function(data){ 
            busLayer.clearLayers(); // clear the layers so that once the fetch is done it can clear the previous one
            
            return data.entity.filter(busRouteOneToTen => busRouteOneToTen.vehicle.trip.routeId <= 10).reduce((previous, current) => {
                
                 L.marker([current.vehicle.position.latitude, current.vehicle.position.longitude],
                    {icon: (map.getZoom() > 10 ? busIcon : busSmallIcon), rotationAngle: current.vehicle.position.bearing})
                    .bindPopup(`Bus-ID : ${current.id}<br>Bus Route: ${current.vehicle.trip.routeId}<br> Trip-ID : ${current.vehicle.trip.tripId}
                    `).addTo(busLayer)});//setTimeout
            
        
        });
    }
    setInterval(Buses,7000);// Seting the interval for refresh to 7 seconds
    
   
    
})();