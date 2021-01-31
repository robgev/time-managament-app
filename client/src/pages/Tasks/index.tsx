import React, { useContext, useEffect } from 'react';
import AppBar from 'components/AppBar';
import { withTasks, tasksStore, actions } from 'contexts/Tasks';
import { ITask } from 'types/Task';
import Table from 'components/Table';
import pick from 'lodash/pick';
import { userStore } from 'contexts/CurrentUser';

import useStyles from './styles';

const Tasks = () => {
  // const classes = useStyles();
  const { tasksData, dispatch } = useContext<any>(tasksStore);
  const { id } = useContext<any>(userStore);
  useEffect(() => {
    const fetchData = async () => {
      await actions.getAll(dispatch, {});
    }
    fetchData();
  }, [dispatch])

  const onAdd = async (data: ITask) => {
    await actions.add(dispatch, { ...data, byUser: id });
  }

  const onEdit = async (id: number, edits: Pick<ITask, 'workedWhen' | 'duration' | 'workedOn'>) => {
    const editedTask = pick(edits, ['workedOn', 'workedWhen', 'duration']);
    await actions.edit(dispatch, tasksData, id, editedTask)
  }

  const onDelete = async (id: number) => {
    await actions.remove(dispatch, tasksData, id);
  }

  const onFilter = async ({from, to}: {from: string, to: string}) => {
    await actions.filterTasks(dispatch, { from, to })
  }

  return (
    <>
      <AppBar />
      <div>
        <Table 
          rows={tasksData.tasks} 
          count={tasksData.count}
          totals={tasksData.totals}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
          onFilter={onFilter}
          toolbarText="Tasks"
        />
      </div>
    </>
  )
}

export default withTasks(Tasks);
