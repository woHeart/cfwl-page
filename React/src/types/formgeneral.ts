import type { Control, FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface FieldItem<T> {
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: 'text' | 'textarea' | 'url';
}

export interface FormItemProps<T extends FieldValues> {
  fields: FieldItem<T>[];
  register: UseFormRegister<T>;
  control: Control<T>;
}