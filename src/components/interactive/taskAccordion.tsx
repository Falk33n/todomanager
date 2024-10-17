'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Skeleton,
  SortOptionProps,
  sortOptions,
  TaskProps,
  TaskTable,
  TaskTableActions,
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
  const [selectedTasks, setSelectedTasks] = React.useState<boolean[]>([]);
  const [sort, setSort] = React.useState<SortOptionProps>(sortOptions);

  const handleSelectAll = (isSelected: boolean) => {
    setSelectedTasks(new Array(tasks.length).fill(isSelected));
  };

  const handleSelectSingle = (i: number) => {
    setSelectedTasks((prev) => {
      const updatedSelection = [...prev];
      updatedSelection[i] = !updatedSelection[i];
      return updatedSelection;
    });
  };

  const sortTasks = (tasks: TaskProps): TaskProps => {
    if (sort.dueDate) {
      tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sort.sortFrom === 'A-Z'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    } else if (sort.urgency) {
      const urgencyLevels: { [key: string]: number } = {
        low: 1,
        medium: 2,
        high: 3,
      };

      tasks.sort((a, b) => {
        const urgencyA = urgencyLevels[a.urgency.toLowerCase()] || 0;
        const urgencyB = urgencyLevels[b.urgency.toLowerCase()] || 0;
        return sort.sortFrom === 'A-Z'
          ? urgencyA - urgencyB
          : urgencyB - urgencyA;
      });
    } else if (sort.title) {
      tasks.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return sort.sortFrom === 'A-Z'
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
    }

    return tasks;
  };

  React.useEffect(() => {
    const activeTasks = localStorage.getItem('activeTasks');

    if (activeTasks) {
      try {
        const parsedTasks: TaskProps = JSON.parse(activeTasks);
        if (Array.isArray(parsedTasks)) {
          const filteredTasks = parsedTasks.filter((task) => {
            return task.status === type;
          });

          setTasks(sortTasks(filteredTasks));
          setSelectedTasks(new Array(filteredTasks.length).fill(false));
          setIsLoading(false);
        }
      } catch (e) {
        console.error('Error parsing active tasks from localStorage:', e);
      }
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <Accordion
      type='single'
      collapsible
      className={cn('w-full', type === 'active' && 'border-t', className)}
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
        {!isLoading && (
          <AccordionContent className='pb-8'>
            <TaskTableActions
              selectedTasks={selectedTasks.filter((isSelected) => isSelected)}
              tasks={tasks}
              type={type}
              onSelectAll={(isSelected) => handleSelectAll(isSelected)}
              onSortChange={(newSort) => setSort(newSort)}
            />
            <TaskTable
              tasks={sortTasks(tasks)}
              type={type}
              selectedTasks={selectedTasks}
              onSelectTask={handleSelectSingle}
            />
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
};

TaskAccordion.displayName = 'TaskAccordion';
