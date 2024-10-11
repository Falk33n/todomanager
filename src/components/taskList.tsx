import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components';

export const TaskList = () => {
  return (
    <Accordion type='single'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>Active Tasks</AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

TaskList.displayName = 'TaskList';
