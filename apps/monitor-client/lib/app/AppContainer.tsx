import React, { useContext, useState, useEffect } from 'react'
import { AppContext, IAppContext } from '../context';
import { Login } from '../features/auth/Login';

export function AppContainer() {
  const { api } = useContext<IAppContext>(AppContext);
  const [users, setUsers] = useState<any|null>(null);
  const [contacts, setContacts] = useState<any|null>(null);
  const [sessions, setSessons] = useState<any|null>(null);
  const [statuses, setStatuses] = useState<any|null>(null);
  const [systemHealth, setSystemHealth] = useState<any|null>(null);

  useEffect(function () {
    api?.users.readList({ page: 0, size: 5 }).then(result => {
      setUsers(result);
    })
    api?.contacts.readList({ page: 0, size: 5 }).then(result => {
      setContacts(result);
    });
    api?.sessions.readList({ page: 0, size: 5 }).then(result => {
      setSessons(result);
    });
    api?.statuses.readList({ page: 0, size: 5 }).then(result => {
      setStatuses(result);
    });
    api?.systemHealth.read().then(result => {
      setSystemHealth(result);
    })
  }, []);

  return (
    <>
      <div>
        <div>Users:</div>
        <div>{JSON.stringify(users)}</div>
        <div>Sessions:</div>
        <div>{JSON.stringify(sessions)}</div>
        <div>Contacts:</div>
        <div>{JSON.stringify(contacts)}</div>
        <div>Statuses:</div>
        <div>{JSON.stringify(statuses)}</div>
        <div>System Health:</div>
        <div>{JSON.stringify(systemHealth)}</div>
      </div>
      <div>
        <Login />
      </div>
    </>
  )
}

AppContainer.defaultProps = {}

AppContainer.propTypes = {}
