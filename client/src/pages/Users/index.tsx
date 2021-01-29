import React, { useContext, useEffect } from 'react';
import AppBar from 'components/AppBar';
import { withUsers, usersStore, actions } from 'contexts/Users';
import { TEditUser } from 'contexts/Users/types';
import Table from 'components/UserTable';
import { ICredentials } from 'types/Credentials';

const Tasks = () => {
  const { usersData, dispatch } = useContext<any>(usersStore);
  useEffect(() => {
    const fetchData = async () => {
      await actions.getAll(dispatch, 0, 20);
    }
    fetchData();
  }, [dispatch])

  const onAdd = async (data: ICredentials) => {
    await actions.add(dispatch, data);
  }

  const onEdit = async (id: number, edits: TEditUser) => {
    await actions.edit(dispatch, usersData, id, edits)
  }

  const onDelete = async (id: number) => {
    await actions.remove(dispatch, usersData, id);
  }

  return (
    <>
      <AppBar />
      <div>
        <Table 
          rows={usersData.users} 
          count={usersData.count}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </>
  )
}

export default withUsers(Tasks);
