'use client';

import {
  Button,
  Checkbox,
  Label,
  SortOptionProps,
  SortTaskDropdown,
  TaskProps,
  TaskTableProps,
} from '@/components';
import { Move, Trash } from 'lucide-react';
import React from 'react';

const TaskTableActionStates = {
  isSelectAllChecked: false,
  isDeleteChecked: false,
  isMoveChecked: false,
};

type TaskTableActionsProps = {
  type: TaskTableProps['type'];
  onSelectAll: (isSelected: boolean) => void;
  tasks: TaskProps;
  selectedTasks: boolean[];
  onSortChange: (sort: SortOptionProps) => void;
};

export const TaskTableActions = ({
  type,
  onSelectAll,
  tasks,
  selectedTasks,
  onSortChange,
}: TaskTableActionsProps) => {
  const [state, setState] = React.useState(TaskTableActionStates);

  const handleMoveClick = () => {
    setState((prev) => ({
      ...prev,
      isDeleteChecked: false,
      isMoveChecked: !prev.isMoveChecked,
    }));
  };

  const handleDeleteClick = () => {
    setState((prev) => ({
      ...prev,
      isMoveChecked: false,
      isDeleteChecked: !prev.isDeleteChecked,
    }));
  };

  const handleSelectAllClick = () => {
    setState((prev) => ({
      ...prev,
      isSelectAllChecked: !prev.isSelectAllChecked,
    }));
    onSelectAll(!state.isSelectAllChecked);
  };

  React.useEffect(() => {
    if (selectedTasks.length === tasks.length && tasks.length > 0) {
      if (!state.isSelectAllChecked) {
        setState((prev) => ({
          ...prev,
          isSelectAllChecked: true,
        }));
      }
    } else if (
      state.isSelectAllChecked &&
      selectedTasks.length !== tasks.length
    ) {
      setState((prev) => ({
        ...prev,
        isSelectAllChecked: false,
      }));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTasks]);

  return (
    <>
      {tasks && tasks.length > 0 && (
        <div
          role='group'
          className='flex justify-between items-center gap-x-1 pt-6 pb-3 border-t'
        >
          <div className='flex items-center gap-x-2'>
            <div
              className='flex items-center gap-x-2 hover:bg-muted px-3 rounded-md h-9 cursor-pointer'
              onClick={handleSelectAllClick}
            >
              <Checkbox
                id={`${type}-task-table-select-checkbox`}
                aria-checked={state.isSelectAllChecked}
                checked={state.isSelectAllChecked}
                aria-controls={`${type}-task-table`}
              />
              <Label
                aria-live='polite'
                htmlFor={`${type}-task-table-select-checkbox`}
                className='pointer-events-none'
              >
                {state.isSelectAllChecked ? 'Unselect All' : 'Select All'}
              </Label>
            </div>
            {(state.isSelectAllChecked || selectedTasks.length > 0) && (
              <>
                <Button
                  aria-label='Delete selected tasks.'
                  variant='ghost'
                  size='sm'
                  onClick={handleDeleteClick}
                  aria-controls={`${type}-task-table`}
                  className='flex items-center gap-x-2'
                >
                  <Trash
                    className='text-red-500 size-4'
                    aria-hidden
                  />
                  {state.isSelectAllChecked || selectedTasks.length > 1
                    ? 'Delete tasks'
                    : 'Delete task'}
                </Button>
                <Button
                  aria-label='Move selected tasks.'
                  variant='ghost'
                  size='sm'
                  onClick={handleMoveClick}
                  aria-controls={`${type}-task-table`}
                  aria-live='polite'
                  className='flex items-center gap-x-2'
                >
                  <Move
                    className='text-muted-foreground size-4'
                    aria-hidden
                  />
                  {state.isSelectAllChecked || selectedTasks.length > 1
                    ? 'Move tasks'
                    : 'Move task'}
                </Button>
              </>
            )}
          </div>
          <SortTaskDropdown
            type={type}
            onSortChange={onSortChange}
          />
        </div>
      )}
    </>
  );
};

TaskTableActions.displayName = 'TaskTableActions';
