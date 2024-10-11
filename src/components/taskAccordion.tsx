import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  TaskProps,
  TaskTable,
  type TaskTableProps,
} from '@/components';

type TaskAccordionProps = {
  label: string;
  id: string;
  type: TaskTableProps['type'];
  className?: string;
};

export const TaskAccordion = ({
  id,
  label,
  type,
  className,
}: TaskAccordionProps) => {
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
          {
            title: 'Completed',
            status: 'scheduled',
            urgency: 'low',
            dueDate: '2024-11-01',
          },
          {
            title: 'Completed',
            status: 'scheduled',
            urgency: 'low',
            dueDate: '2024-11-01',
          },
        ];

  return (
    <Accordion
      type='single'
      collapsible
      className={className}
    >
      <AccordionItem value={id}>
        <AccordionTrigger className='flex-row-reverse justify-end gap-4'>
          <span>
            {label}
            <Badge
              variant='secondary'
              className='ml-4 px-2 py-1 rounded-full'
            >
              <span aria-label={`The total amount of ${type} tasks is ${tasks.length ?? '0'}`} >{tasks.length ?? '0'}</span>
            </Badge>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <TaskTable
            tasks={tasks}
            type={type}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

TaskAccordion.displayName = 'TaskAccordion';
