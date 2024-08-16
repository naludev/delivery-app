import { useState } from "react";

// useFormValidation.hooks.ts
type ValidationRules = {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  isAdult?: boolean;
};

function useFormValidation<T extends Record<string, any>>(formData: T, rules: Record<keyof T, ValidationRules>) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    Object.keys(rules).forEach((key) => {
      const value = formData[key as keyof T];
      const rule = rules[key as keyof T];

      if (rule.required && (value === '' || value === null || value === undefined)) {
        newErrors[key as keyof T] = 'Este campo es obligatorio';
      } else if (rule.email && typeof value === 'string' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        newErrors[key as keyof T] = 'Correo electrónico inválido';
      } else if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
        newErrors[key as keyof T] = `Debe tener al menos ${rule.minLength} caracteres`;
      } else if (rule.isAdult && typeof value === 'boolean' && !value) {
        newErrors[key as keyof T] = 'Debe ser mayor de edad';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validate };
}

export default useFormValidation;
