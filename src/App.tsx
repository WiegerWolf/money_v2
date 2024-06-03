import { useState, useEffect } from 'react'
import './App.css'
import { SQLJsDatabase, drizzle } from 'drizzle-orm/sql-js';
import * as schema from './schema.ts';

const { users } = schema

function App() {
  const [db, setDb] = useState<SQLJsDatabase<typeof schema>>()
  const [userList, setUsers] = useState<typeof users.$inferInsert[]>([])

  useEffect(() => {
    (async () => {
      const SQL = await window.initSqlJs({
        locateFile: (file: string) => `/${file}`,
      });
      const dbFile = await (await fetch('/sqlite.db')).arrayBuffer();
      const sqldb = new SQL.Database(new Uint8Array(dbFile));
      setDb(drizzle(sqldb, { schema }));
    })().catch(console.error);
  }, []);

  useEffect(() => {
    if (db) {
      db
        .select()
        .from(users)
        .then(setUsers);
    }
  }, [db]);

  return (
    <>
      <div className="card">
        <ul>
          {userList.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
      </div>
    </>
  )
}

export default App
