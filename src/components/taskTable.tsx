import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components';
import { cn } from '@/lib';

export type TaskTableProps = {
  type: 'active' | 'inactive' | 'completed';
};

type TaskProps = {
  title: string;
  status: 'in-progress' | 'completed' | 'scheduled';
  urgency: 'important' | 'normal' | 'low';
  dueDate?: string;
}[];

export const TaskTable = ({ type }: TaskTableProps) => {
  const tasks: TaskProps =
    type === 'active'
      ? [
          {
            title:
              'Active Active Active Active Active Active Active Active Active Active Active Active Active Active Active Active Active Active Active Active ',
            status: 'in-progress',
            urgency: 'important',
          },
        ]
      : type === 'inactive'
      ? [
          {
            title: 'Inactive',
            status: 'completed',
            urgency: 'normal',
            dueDate: '2024-10-10',
          },
        ]
      : [
          {
            title: 'Completed',
            status: 'scheduled',
            urgency: 'low',
            dueDate: '2024-11-01',
          },
        ];

  return (
    <Table>
      <TableCaption className='sr-only'>
        A list of your {type} tasks.
      </TableCaption>
      <TableHeader>
        <TableRow className={cn('hover:bg-muted/70')}>
          <TableHead
            aria-hidden
            className='w-[2.5%] whitespace-nowrap'
          >
            No.
          </TableHead>
          <TableHead className='w-[75%] min-w-[200px]'>Title</TableHead>
          <TableHead className='w-[7.5%] whitespace-nowrap'>Status</TableHead>
          <TableHead className='w-[7.5%] whitespace-nowrap'>Urgency</TableHead>
          <TableHead className='text-right w-[7.5%] whitespace-nowrap'>
            Due Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, i) => (
          <TableRow
            key={i}
            className={cn('hover:bg-muted/70', i % 2 === 0 && 'bg-muted/35')}
          >
            <TableCell
              aria-hidden
              className='w-[2.5%] font-medium whitespace-nowrap'
            >
              {i + 1}.
            </TableCell>
            <TableCell className='w-[75%] min-w-[200px]'>
              {task.title}
            </TableCell>
            <TableCell className='w-[7.5%] capitalize whitespace-nowrap'>
              {task.status}
            </TableCell>
            <TableCell className='w-[7.5%] capitalize whitespace-nowrap'>
              {task.urgency}
            </TableCell>
            <TableCell className='text-right w-[7.5%] whitespace-nowrap'>
              {task.dueDate ?? <span aria-label='No due date'>---</span>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TaskTable.displayName = 'TaskTable';
