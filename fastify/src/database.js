import Database from 'better-sqlite3'

export const db = new Database('fastify/database.db') /*
    - Va chercher le fichier par rapport au context d'exécution, là ou j'ai tapé ma commande nodejs
*/