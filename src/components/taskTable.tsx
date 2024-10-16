'use client';

import {
  Checkbox,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { cn } from '@/lib';
import React from 'react';

type TaskTableRowProps = {
  type: TaskTableProps['type'];
  task: {
    title: string;
    status: 'active' | 'completed' | 'inactive';
    urgency: 'high' | 'normal' | 'low';
    dueDate: string;
  };
  i: number;
};

const TaskTableRow = ({ type, task, i }: TaskTableRowProps) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const checkboxRef = React.useRef<HTMLButtonElement>(null);

  const handleSelection = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
      checkboxRef.current.focus();
    }
  };

  return (
    <TableRow
      key={i}
      id={`${type}-task-row-${i}`}
      className={cn(
        'hover:bg-muted/70 cursor-pointer',
        i % 2 === 0 && 'bg-muted/35',
        isSelected && 'bg-muted/70 hover:bg-muted'
      )}
      onClick={handleSelection}
      role='row'
    >
      <TableCell className='relative w-[40px]'>
        <Checkbox
          className='top-1/2 left-1/2 absolute -translate-y-1/2 translate-x-[calc(-50%+5px)]'
          aria-label={`Select task: ${task.title}`}
          onClick={() => setIsSelected((prev) => !prev)}
          aria-checked={isSelected}
          checked={isSelected}
          ref={checkboxRef}
        />
      </TableCell>
      <TableCell className='w-[calc(87.5%-40px)] min-w-[200px]'>
        {task.title}
      </TableCell>
      <TableCell className='w-[7.5%] capitalize whitespace-nowrap'>
        {task.urgency}
      </TableCell>
      <TableCell className='text-right w-[5%] whitespace-nowrap'>
        {task.dueDate}
      </TableCell>
    </TableRow>
  );
};

export type TaskProps = TaskTableRowProps['task'][];

export type TaskTableProps = {
  type: 'active' | 'inactive' | 'completed';
  tasks: TaskProps;
};

export const TaskTable = ({ type, tasks }: TaskTableProps) => {
  return (
    <Table>
      <TableCaption className='sr-only'>
        A list of your {type} tasks.
      </TableCaption>
      <TableHeader>
        <TableRow className={cn('hover:bg-muted/70')}>
          <TableHead
            aria-label='Selected'
            className='w-[40px]'
          />
          <TableHead className='w-[calc(87.5%-40px)] min-w-[200px]'>
            Title
          </TableHead>
          <TableHead className='w-[7.5%] whitespace-nowrap'>Urgency</TableHead>
          <TableHead className='text-right w-[5%] whitespace-nowrap'>
            Due Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, i) => (
          <TaskTableRow
            key={i}
            type={type}
            task={task}
            i={i}
          />
        ))}
      </TableBody>
    </Table>
  );
};

TaskTable.displayName = 'TaskTable';
