'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Skeleton,
  TaskProps,
  TaskTable,
  type TaskTableProps,
} from '@/components';
import { cn } from '@/lib';
import React from 'react';

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
  const [tasks, setTasks] = React.useState<TaskProps>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const activeTasks = localStorage.getItem('activeTasks');
    if (activeTasks) {
      try {
        const parsedTasks: TaskProps = JSON.parse(activeTasks);
        if (Array.isArray(parsedTasks)) {
          const filteredTasks = parsedTasks.filter((task) => {
            return task.status === type;
          });

          setTasks(filteredTasks);
          setIsLoading(false);
        }
      } catch (e) {
        console.error('Error parsing active tasks from localStorage:', e);
      }
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Accordion
      defaultValue={
        tasks.length === 0 ? undefined : type === 'active' ? id : undefined
      }
      type='single'
      collapsible
      className={cn('w-full', className)}
    >
      <AccordionItem value={id}>
        <AccordionTrigger
          className='flex-row-reverse justify-end gap-4 disabled:opacity-75'
          disabled={tasks.length === 0}
        >
          <span>
            {label}
            {!isLoading ? (
              <Badge
                variant='secondary'
                className='ml-4 px-2 py-1 rounded-full'
              >
                <span
                  aria-label={`The total amount of ${type} tasks is ${
                    tasks.length ?? '0'
                  }`}
                >
                  {tasks.length ?? '0'}
                </span>
              </Badge>
            ) : (
              <Skeleton className='inline ml-4 px-3.5 py-1 rounded-full size-4' />
            )}
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
