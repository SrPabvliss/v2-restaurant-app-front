import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import { ICustomer } from '@/app/types/customer'
import { createCustomer, updateCustomer } from '../../api/useCostumers';
import { use } from 'react';
import { useCustomerStore } from '@/app/store/customerStore';


export const useClientForm = (
  initialValues: ICustomer,
  onClose: () => void,
) => {

  const {customers, setCustomers, loadCustomers, setCustomersLoaded} = useCustomerStore()

  const validationSchema = yup.object({
    // name: yup.string().required('El nombre es requerido'),
  })

  const formik = useFormik<ICustomer>({
    enableReinitialize: true,
    initialValues: {
        id: initialValues.id || 0,
        firstName: initialValues.firstName || '',
        secondName: initialValues.secondName || '',
        firstLastName: initialValues.firstLastName || '',
        secondLastName: initialValues.secondLastName || '',
        email: initialValues.email || '',
        phoneNumber: initialValues.phoneNumber || '',
        address: initialValues.address || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!initialValues.id) {
        await handleCreateEmployee(values)
        onClose()
        return
      }

      const editedFields: { [key: string]: unknown } = {}

      Object.keys(initialValues).forEach((key) => {
        if (
          initialValues[key as keyof ICustomer] !== values[key as keyof ICustomer]
        ) {
          editedFields[key] = values[key as keyof ICustomer]
        }
      })

      if (Object.keys(editedFields).length === 0) {
        onClose()
        return
      }
      await handleUpdateProcess(initialValues.id.toString(), editedFields)
      onClose()
    },
  })

  const handleCreateEmployee = async (values: ICustomer) => {

    console.log(values)
    try {
      const result = await createCustomer(values)

      if (result) {
        setCustomers([...customers as ICustomer[],result])
        toast.success('Cliente creado exitosamente')
        formik.resetForm()
      } else {
        toast.error('Error al crear el cliente', {
          closeButton: false,
        })
      }
    } catch (error) {
      toast.error('Ocurrió un error al crear el cliente')
    }
  }

  const handleUpdateProcess = async (
    id: string,
    editedFields: Partial<ICustomer>,
  ) => {
    console.log(id)
    console.log(editedFields)
    try {
      const result = await updateCustomer(id, editedFields)

      if (result) {
        setCustomersLoaded(false)
        await loadCustomers()
        setCustomersLoaded(true)
        toast.success('Cliente actualizado exitosamente')
        formik.resetForm()
      } else {
        toast.error('Error al actualizar el cliente', {
          closeButton: false,
        })
      }
    } catch (error) {
      toast.error('Ocurrió un error al actualizar el cliente')
    }
  }

  return { formik }
}
