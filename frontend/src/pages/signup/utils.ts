import useFormValidation from "@hooks/useFormValidation";

export interface FormData {
    email: string;
    username: string;
    name: string;
    lastname: string;
    password: string;
    adult: boolean;
  }
  
  export const validateForm = (
    formData: FormData,
    validationRules: any
  ) => {
    const { errors, validate } = useFormValidation(formData, validationRules);
    return { errors, validate };
  };
  
  export const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  export const isFormValid = (formData: FormData): boolean => {
    return (
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.name.trim() !== '' &&
      formData.lastname.trim() !== '' &&
      formData.username.trim() !== '' &&
      formData.adult
    );
  };
  