import React from 'react'
import { cn } from '@/lib/utils';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from '@/components/ui/card';

export function CustomCard({
    className,
    cardHeader,
    cardContent,
    cardFooter,
    ...props
  }) {
    return (
      <Card
        className={cn('w-[380px]', className)}
        {...props}
      >
        <CardHeader>{cardHeader}</CardHeader>
        <CardContent className="grid gap-4">{cardContent}</CardContent>
        <CardFooter>{cardFooter}</CardFooter>
      </Card>
    );
  }