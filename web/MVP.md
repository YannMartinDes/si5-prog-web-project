# Documentation des périmètres

## MVP 1 :
## Done : 
- Carte avec différentes marqueurs où chaque marqueurs représentent une station essence.
- Affichage du nom et du prix des essences de la station lors du hover sur un marqueur
- Afficher plus d'infos sur un station essence (menu déroulant à la GG map ? horaire de la station essence, affluence de la station en fonction de l'heure)
- Fetch périodiquement avec un CRON les données des stations essence sur l'Open API du gouvernement
- Pouvoir envoyer toutes les positions des stations essence en France (ou sur le département si ça tue le client) ainsi que leur id
- Pouvoir fournir les infos d'une station essence en particulier en donnant son id
- Pouvoir filter les stations essences par services disponibles
- Pouvoir filter les stations essences par essence disponibles
- Geolocalisation de l'utilisateur (une fois au démarrage)

## Remain Todo :

- Compte utilisateur 
- Plusieurs formats d'affichage et de recherche : par type de gas, par ville, station la plus proche, la moins chère dans une zone (ville ou rayon)....
- Champ de recherche (ville, station essence, type de gas, par marque de station essence)
- Feedback et signalement lors d'erreur sur les informations des stations
- Lors d'un roadtrip, proposé un itinéraire d'une ville à une autre en passant par les stations les moins chères (prendre en compte la capacité de la voiture)
- Envoie de notification lors d'un prix intéressant 
- Station favorite (et proposer un chemin vers les stations favorite)
- Proposer un itinéraire depuis la positions courante ou bien depuis une position donnée (par adresse, par drag and drop d'un marqueur ?)
- Pouvoir voir un graphe de l'évolution du prix pour une station essence
- Diagramme de comparaison des prix par villes 
- Theme dark/light
- ...
