import * as yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { IUser } from "@/app/types/user";
import { createEmployee, updateEmployee } from "@/app/api/useEmployees";
import { useEmployeesStore } from "@/app/store/employeesStore";

export const useEmployeeForm = (initialValues: IUser, onClose: () => void) => {
  const { employees, setEmployees, setEmployeesLoaded, loadEmployees } =
    useEmployeesStore();
  const validationSchema = yup.object({
    // name: yup.string().required('El nombre es requerido'),
  });

  const formik = useFormik<IUser>({
    enableReinitialize: true,
    initialValues: {
      id: initialValues.id || "",
      firstName: initialValues.firstName || "",
      secondName: initialValues.secondName || "",
      firstLastName: initialValues.firstLastName || "",
      secondLastName: initialValues.secondLastName || "",
      email: initialValues.email || "",
      phoneNumber: initialValues.phoneNumber || "",
      address: initialValues.address || "",
      user: initialValues.user || "",
      password: initialValues.password || "",
      role: initialValues.role || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!initialValues.id) {
        await handleCreateEmployee(values);
        onClose();
        return;
      }

      const editedFields: { [key: string]: unknown } = {};

      Object.keys(initialValues).forEach((key) => {
        if (initialValues[key as keyof IUser] !== values[key as keyof IUser]) {
          editedFields[key] = values[key as keyof IUser];
        }
      });

      if (Object.keys(editedFields).length === 0) {
        onClose();
        return;
      }
      await handleUpdateProcess(initialValues.id, editedFields);
      onClose();
    },
  });

  const handleCreateEmployee = async (values: IUser) => {
    try {
      const result = await createEmployee(values);

      if (result) {
        setEmployees([...(employees as IUser[]), result]);
        toast.success("Empleado creado exitosamente");
        formik.resetForm();
      } else {
        toast.error("Error al crear el empleado", {
          closeButton: false,
        });
      }
    } catch (error) {
      toast.error("Ocurrió un error al crear el empleado");
    }
  };

  const handleUpdateProcess = async (
    id: string,
    editedFields: Partial<IUser>
  ) => {
    try {
      const result = await updateEmployee(id, editedFields);

      if (result) {
        setEmployeesLoaded(false);
        await loadEmployees();
        setEmployeesLoaded(true);
        toast.success("Empleado actualizado exitosamente");
        formik.resetForm();
      } else {
        toast.error("Error al actualizar el empleado", {
          closeButton: false,
        });
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar el empleado");
    }
  };

  return { formik };
};
