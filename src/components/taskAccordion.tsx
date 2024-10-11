import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
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
              className='ml-4 p-1.5 rounded-full'
            >
              13
            </Badge>
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <TaskTable type={type} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

TaskAccordion.displayName = 'TaskAccordion';
