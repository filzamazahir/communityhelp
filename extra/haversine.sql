# Haversine formula to get distance between 2 latitude and longitude
# Latitude 37.4.714 and Longitude -121.955815 is used as an example here. 
# Distance is converted to miles then places with distance less than 5 miles are included in the result
# http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
# http://www.scribd.com/doc/2569355/Geo-Distance-Search-with-MySQL

SELECT *
FROM locations 
WHERE 
(2 * 6731*0.621371* ATAN( 
SQRT(SIN(RADIANS(lat-37.401714)/2) * SIN(RADIANS(lat-37.401714)/2) + COS(RADIANS(37.401714)) * COS(RADIANS(lat)) * SIN(RADIANS(-121.955815-lng)/2) * SIN(RADIANS(-121.955815-lng)/2)),
SQRT(1 - SIN(RADIANS(lat-37.401714)/2) * SIN(RADIANS(lat-37.401714)/2) + COS(RADIANS(37.401714)) * COS(RADIANS(lat)) * SIN(RADIANS(-121.955815-lng)/2) * SIN(RADIANS(-121.955815-lng)/2)) ) ) < 5
