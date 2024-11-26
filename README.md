
➡️ CONSIGNE:

- Une API REST en Node.js/Express lié à une base de données (MongoDB https://mongodb.github.io/node-mongodb-native/3.2/ ) qui contient les produits (voir plus bas) et qui permettra de créer, récupérer, modifier ou supprimer ces données.

- Une application Web en ReactJS qui permettra de consulter ces produits, les modifier, en supprimer ou en créer de nouveaux, vous afficherez les produits dans une liste. Pour la modification et la suppression, nous vous laissons le choix de la view à implémenter (Page de modification/Popup, etc).
 
- Vous devrez utiliser Material UI (https://material-ui.com/) pour le design.
 
Bonus :
- WebSocket: (https://socket.io/) à implémenter entre le serveur et l'application afin de garder les produits à jour.
- Authentification JWT/Token,
- Implémenter Redux (https://redux.js.org/) dans l'application (pour charger les produits/gérer les actions)
 
Votre code devra respecter la norme du linter ESLint (https://eslint.org/ ) (vous pouvez aussi l'installer directement via VSCode).

Les produits de la base de données : 
[
  { "_id" : 1, "name" : "AC1 Phone1", "type" : "phone", "price" : 200.05, "rating" : 3.8,"warranty_years" : 1, "available" : true },
  { "_id" : 2, "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1,"warranty_years" : 3, "available" : false },
  { "_id" : 3, "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2,"warranty_years" : 1, "available" : true },
  { "_id" : 4, "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3,"warranty_years" : 2, "available" : true }
]


➡️ MODE D'EMPLOI:

->lancer la commande : "docker-compose up --build" pour la base de donnees ( installer l'outil Docker desktop au prealable)
->lancer la commande : "node server.js" pour lancer l'API 
->lancer la commande : "npm run start" pour lancer le front-end

➡️ A SAVOIR:

L'erreur "Erreur : Request failed with status code 401" apparait lorsqu'on est pas authentifie .

