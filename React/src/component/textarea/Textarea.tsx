import React, { useState, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import type { JsonTextareaProps } from "@/types/textarea";

const JsonTextarea: React.FC<JsonTextareaProps> = ({
  value = '',
  onChange,
  placeholder,
  onBlur,
}) => {
  const [internalValue, setInternalValue] = useState<string>(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const { selectionStart, selectionEnd } = textarea;
      const currentValue = internalValue;

      const newValue =
        currentValue.substring(0, selectionStart) +
        '  ' +
        currentValue.substring(selectionEnd);

      setInternalValue(newValue);
      onChange?.(newValue);

      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = selectionStart + 2;
          textarea.selectionEnd = selectionStart + 2;
        }
      }, 0);
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const { selectionStart, selectionEnd } = textarea;
      const currentValue = internalValue;

      const newdata =
        currentValue.substring(0, selectionStart) +
        '\n    ' +
        currentValue.substring(selectionEnd);

      setInternalValue(newdata);
      onChange?.(newdata);
      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = selectionStart + 5;
          textarea.selectionEnd = selectionStart + 5;
        }
      }, 0);
    }

    if (e.key === '{') {
      e.preventDefault();
      e.stopPropagation();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const { selectionStart, selectionEnd } = textarea;
      const currentValue = internalValue;

      const nextChar = currentValue[selectionStart];

      const isNextCharBlankOrEnd = !nextChar || nextChar === ' ' || nextChar === '\t' || nextChar === '\n';

      if (isNextCharBlankOrEnd) {
        const value =
          currentValue.substring(0, selectionStart) +
          '{\n    \n}' +
          currentValue.substring(selectionEnd);
        const normalizeText = (text: string) => {
          return text
            .replace(/} /g, '}')
        };
        const newValue = normalizeText(value);
        setInternalValue(newValue);
        onChange?.(newValue);
        setTimeout(() => {
          if (textarea) {
            textarea.selectionStart = selectionStart + 6;
            textarea.selectionEnd = selectionStart + 6;
          }
        }, 0);
      } else {
        const newValue =
          currentValue.substring(0, selectionStart) +
          '{' +
          currentValue.substring(selectionEnd);
        setInternalValue(newValue);
        onChange?.(newValue);
        setTimeout(() => {
          if (textarea) {
            textarea.selectionStart = selectionStart + 1;
            textarea.selectionEnd = selectionStart + 1;
          }
        }, 0);
      };
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={internalValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};

export default JsonTextarea;