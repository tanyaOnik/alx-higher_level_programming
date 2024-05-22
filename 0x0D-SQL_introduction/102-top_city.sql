SELECT city, AVG(value) AS avg_ temp
FROM ' temperatures*
WHERE 'month' = 7 OR 'month' = 8
GROUP BY 'city
ORDER BY avg_temp' DESC
LIMIT 3;
