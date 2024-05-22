SELECT 'state', MAX('value') AS FROM 'temperatures'
GROUP BY 'state'
ORDER BY 'state';
