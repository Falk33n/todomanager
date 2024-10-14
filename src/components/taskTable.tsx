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

export type TaskProps = {
  title: string;
  status: 'in-progress' | 'completed' | 'scheduled';
  urgency: 'high' | 'normal' | 'low';
  dueDate?: string;
}[];

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
          <TableHead className='w-[80%] min-w-[200px]'>Title</TableHead>
          <TableHead className='w-[7.5%] whitespace-nowrap'>Status</TableHead>
          <TableHead className='w-[7.5%] whitespace-nowrap'>Urgency</TableHead>
          <TableHead className='text-right w-[5%] whitespace-nowrap'>
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
            <TableCell className='w-[80%] min-w-[200px]'>
              {task.title}
            </TableCell>
            <TableCell className='w-[7.5%] capitalize whitespace-nowrap'>
              {task.status}
            </TableCell>
            <TableCell className='w-[7.5%] capitalize whitespace-nowrap'>
              {task.urgency}
            </TableCell>
            <TableCell className='text-right w-[5%] whitespace-nowrap'>
              {task.dueDate ?? <span aria-label='No due date'>---</span>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TaskTable.displayName = 'TaskTable';
