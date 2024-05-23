-- a script that lists all shows from hbtn_0d_tvshows_rate by their rating.
SELECT title ,SUM(rate) AS rating 
FROM tv_shows AS t
	INNER JOIN tv_shows_rating AS r
	ON tv.id = r.show_id
	GROUP BY title
	ORDER BY rating DESC;

