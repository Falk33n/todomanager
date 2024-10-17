'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  TaskTableProps,
} from '@/components';
import { cn } from '@/lib';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

export type SortOptionProps = {
  dueDate: boolean;
  urgency: boolean;
  title: boolean;
  sortFrom: 'A-Z' | 'Z-A';
};

export const sortOptions: SortOptionProps = {
  dueDate: true,
  urgency: false,
  title: false,
  sortFrom: 'A-Z',
};

type SortTaskDropdownProps = {
  type: TaskTableProps['type'];
  onSortChange: (sort: SortOptionProps) => void;
};

export const SortTaskDropdown = ({
  type,
  onSortChange,
}: SortTaskDropdownProps) => {
  const [sort, setSort] = React.useState(sortOptions);

  const handleSortChange = (newSort: Partial<SortOptionProps>) => {
    const updatedSort = { ...sort, ...newSort };
    setSort(updatedSort);
    onSortChange(updatedSort);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='flex items-center gap-x-2'
          aria-controls={`${type}-task-table`}
        >
          <span aria-label='Sort the table by'>
            Sort by:
            <span className='font-normal text-muted-foreground'>
              {sort.dueDate
                ? ' Due Date'
                : sort.urgency
                ? ' Urgency'
                : ' Title'}
            </span>
          </span>
          <ChevronDown
            className={cn(
              'size-4',
              sort.sortFrom === 'Z-A' ? 'rotate-180' : ''
            )}
            aria-hidden
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className='cursor-pointer'
          disabled={sort.dueDate}
          checked={sort.dueDate}
          onCheckedChange={() =>
            handleSortChange({
              dueDate: !sort.dueDate,
              title: false,
              urgency: false,
            })
          }
        >
          Due Date
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className='cursor-pointer'
          disabled={sort.urgency}
          checked={sort.urgency}
          onCheckedChange={() =>
            handleSortChange({
              urgency: !sort.urgency,
              title: false,
              dueDate: false,
            })
          }
        >
          Urgency
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className='cursor-pointer'
          disabled={sort.title}
          checked={sort.title}
          onCheckedChange={() =>
            handleSortChange({
              title: !sort.title,
              urgency: false,
              dueDate: false,
            })
          }
        >
          Title
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort from:</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          className='cursor-pointer'
          disabled={sort.sortFrom === 'A-Z'}
          checked={sort.sortFrom === 'A-Z'}
          onCheckedChange={() =>
            handleSortChange({
              sortFrom: 'A-Z',
            })
          }
        >
          <span
            aria-label='Sort from lowest to highest.'
            className='flex items-center gap-x-2'
          >
            A-Z
            <span className='text-muted-foreground'>(Lowest to highest)</span>
          </span>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className='cursor-pointer'
          disabled={sort.sortFrom === 'Z-A'}
          checked={sort.sortFrom === 'Z-A'}
          onCheckedChange={() =>
            handleSortChange({
              sortFrom: 'Z-A',
            })
          }
        >
          <span
            aria-label='Sort from highest to lowest.'
            className='flex items-center gap-x-2'
          >
            Z-A
            <span className='text-muted-foreground'>(Highest to Lowest)</span>
          </span>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

SortTaskDropdown.displayName = 'SortTaskDropdown';
