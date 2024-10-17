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
import { Circle } from 'lucide-react';

type TaskTableRowProps = {
  type: TaskTableProps['type'];
  task: {
    title: string;
    status: 'active' | 'completed' | 'inactive';
    urgency: 'high' | 'medium' | 'low';
    dueDate: string;
  };
  i: number;
  isSelected: boolean;
  onSelectTask: () => void;
};

const TaskTableRow = ({
  type,
  task,
  i,
  isSelected,
  onSelectTask,
}: TaskTableRowProps) => {
  return (
    <TableRow
      key={i}
      id={`${type}-task-row-${i}`}
      className={cn(
        'hover:bg-muted/70 cursor-pointer',
        i % 2 !== 0 && 'bg-muted/35',
        isSelected && 'bg-muted/70 hover:bg-muted'
      )}
      onClick={onSelectTask}
      role='row'
    >
      <TableCell className='relative w-[40px]'>
        <Checkbox
          className='top-1/2 left-1/2 absolute -translate-y-1/2 translate-x-[calc(-50%+5px)] pointer-events-none'
          aria-label={`Select task: ${task.title}`}
          aria-checked={isSelected}
          checked={isSelected}
        />
      </TableCell>
      <TableCell className='w-[calc(87.5%-40px)] min-w-[200px]'>
        {task.title}
      </TableCell>
      <TableCell className='w-[7.5%] capitalize whitespace-nowrap'>
        <span className='flex items-center gap-x-2'>
          {task.urgency}
          <Circle
            aria-hidden
            className={cn(
              'size-3',
              task.urgency === 'high'
                ? 'text-red-500 fill-red-500'
                : task.urgency === 'medium'
                ? 'text-yellow-500 fill-yellow-500'
                : 'text-green-500 fill-green-500'
            )}
          />
        </span>
      </TableCell>
      <TableCell
        className={cn(
          'text-right w-[5%] whitespace-nowrap',
          new Date(task.dueDate).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0) && 'text-red-500'
        )}
      >
        {task.dueDate}
      </TableCell>
    </TableRow>
  );
};

export type TaskProps = TaskTableRowProps['task'][];

export type TaskTableProps = {
  type: 'active' | 'inactive' | 'completed';
  tasks: TaskProps;
  selectedTasks: boolean[];
  onSelectTask: (i: number) => void;
};

export const TaskTable = ({
  type,
  tasks,
  selectedTasks,
  onSelectTask,
}: TaskTableProps) => {
  return (
    <Table
      id={`${type}-task-table`}
      className='border-t'
    >
      <TableCaption className='sr-only'>
        A table of your {type} tasks.
      </TableCaption>
      <TableHeader>
        <TableRow className={cn('bg-muted/35 hover:bg-muted/70')}>
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
            task={task}
            isSelected={selectedTasks[i]}
            onSelectTask={() => onSelectTask(i)}
            i={i}
            type={type}
          />
        ))}
      </TableBody>
    </Table>
  );
};

TaskTable.displayName = 'TaskTable';
