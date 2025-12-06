// import { useState } from 'react';
// import { ZodSchema } from 'zod';

// export function useValidation<T>(schema: ZodSchema<T>) {
//     const [errors, setErrors] = useState<Record<string, string>>({});

//     const validateField = async (field: keyof T, value: any) => {
//         try {
//             // Validate single field
//             const fieldSchema = schema.pick({ [field]: true } as any);
//             await fieldSchema.parseAsync({ [field]: value });

//             setErrors(prev => {
//                 const newErrors = { ...prev };
//                 delete newErrors[field as string];
//                 return newErrors;
//             });

//             return true;
//         } catch (error: any) {
//             if (error.errors?.[0]) {
//                 setErrors(prev => ({
//                     ...prev,
//                     [field as string]: error.errors[0].message,
//                 }));
//             }
//             return false;
//         }
//     };

//     const validateForm = async (data: any) => {
//         try {
//             await schema.parseAsync(data);
//             setErrors({});
//             return { success: true, errors: {} };
//         } catch (error: any) {
//             const newErrors: Record<string, string> = {};

//             if (error.errors) {
//                 error.errors.forEach((err: any) => {
//                     if (err.path[0]) {
//                         newErrors[err.path[0]] = err.message;
//                     }
//                 });
//             }

//             setErrors(newErrors);
//             return { success: false, errors: newErrors };
//         }
//     };

//     const clearErrors = () => {
//         setErrors({});
//     };

//     return {
//         errors,
//         validateField,
//         validateForm,
//         clearErrors,
//         hasErrors: Object.keys(errors).length > 0,
//     };
// }